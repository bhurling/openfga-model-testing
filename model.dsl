model
  schema 1.1
type user
type feature
  relations
    define access: [user] or subscriber_member from associated_plan
    define associated_plan: [plan]
type plan
  relations
    define subscriber: [organization]
    define subscriber_member: member from subscriber
type organization
  relations
    define member: [user]
