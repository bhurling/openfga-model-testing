import { after, before, binding, given, then, when } from "cucumber-tsflow";
import { expect } from "chai";
import { TestContext } from "../support/test-context";

@binding([TestContext])
export class EntitlementsSteps {
  public constructor(protected context: TestContext) {}

  @before()
  public async before() {
    await this.context.createStore();
  }

  @after()
  public async after() {
    await this.context.deleteStore();
  }

  @given(/I am a member of the (.*) organization/)
  public async iAmMemberOf(organization: string) {
    await this.context.writeTuple({
      user: "user:me",
      relation: "member",
      object: `organization:${organization}`,
    });
  }

  @given(/(.*) organization is on the (.*) plan/)
  public async isOnPlan(organization: string, plan: string) {
    await this.context.writeTuple({
      user: `organization:${organization}`,
      relation: "subscriber",
      object: `plan:${plan}`,
    });
  }

  @given(/(.*) is a feature on the (.*) plan/)
  public async isFeatureOnPlan(feature: string, plan: string) {
    await this.context.writeTuple({
      user: `plan:${plan}`,
      relation: "associated_plan",
      object: `feature:${feature}`,
    });
  }

  @given(/I am given access to the (.*) feature/)
  public async iAmGivenAccessToFeature(feature: string) {
    await this.context.writeTuple({
      user: "user:me",
      relation: "access",
      object: `feature:${feature}`,
    });
  }

  @when(/I want to access (.*)/)
  public async iWantToAccess(feature: string) {
    await this.context.check({
      user: "user:me",
      relation: "access",
      object: `feature:${feature}`,
    });
  }

  @then(/Access should be granted/)
  public async accessShouldBeGranted() {
    expect(this.context.result).to.be.true;
  }

  @then(/Access should be denied/)
  public async accessShouldBeDenied() {
    expect(this.context.result).to.be.false;
  }
}
