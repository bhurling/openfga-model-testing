import * as fs from "fs";
import { OpenFgaApi } from "@openfga/sdk";
import { friendlySyntaxToApiSyntax } from "@openfga/syntax-transformer";

const STORE_NAME = "test-store";
const SCHEME = "http";
const PORT = "8080";
const HOST = `localhost:${PORT}`;

const storeAgnosticClient = new OpenFgaApi({
  apiScheme: SCHEME,
  apiHost: HOST,
});

export class TestContext {
  client: OpenFgaApi;
  result: boolean;

  createStore = async (): Promise<any> => {
    const store = await storeAgnosticClient.createStore({
      name: STORE_NAME,
    });

    this.client = new OpenFgaApi({
      apiScheme: SCHEME,
      apiHost: HOST,
      storeId: store.id,
    });

    const friendlyModel = fs.readFileSync("model.dsl", "utf8");
    const apiModel = friendlySyntaxToApiSyntax(friendlyModel);

    await this.client.writeAuthorizationModel(apiModel);
  };

  deleteStore = async () => {
    await this.client.deleteStore();
  };

  writeTuple = async (tuple: {
    user: string;
    relation: string;
    object: string;
  }) => {
    await this.client.write({
      writes: {
        tuple_keys: [
          {
            user: tuple.user,
            relation: tuple.relation,
            object: tuple.object,
          },
        ],
      },
    });
  };

  check = async (tuple: { user: string; relation: string; object: string }) => {
    const { allowed } = await this.client.check({
      tuple_key: {
        user: tuple.user,
        relation: tuple.relation,
        object: tuple.object,
      },
    });

    this.result = allowed;
  };
}
