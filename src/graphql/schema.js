const typeDefs = `#graphql
    type User {
      name: String,
      email: String!
      #password: String!  # no sensitive fields or data 
      events: [Event]
    }
    
    type AuthPayload {
      token: String!
      user: User!
    }

    type RequestResetResponse {
      status: Boolean!
      token: String # returned only for demo; in prod you email it instead
    }

    type Event {        
      title: String!
      description: String
      date: String!
      creator: User! # Non-nullable
      invites: [EventInvite]
    }

    type EventInvite {        
      email: String!
      event: Event!
    }

    input CreateEventInput {
      title: String!
      description: String
      date: String!
    }

    input InviteUsersInput {
      eventId: ID!
      emails: [String!]
    }
    
    type Query {
      me: User
      myEvents: [Event!]!
      eventDetail(eventId: ID!): Event
    }

    type Mutation {
      register(name: String, email: String!, password: String!): User!
      login(email: String!, password: String!): AuthPayload!

      changePassword(oldPassword: String!, newPassword: String!): Boolean!
      updatePassword(newPassword: String!): Boolean!

      requestPasswordReset(email: String!): RequestResetResponse!
      resetPassword(token: String!, newPassword: String!): Boolean!

      createEvent(data: CreateEventInput!): Event!
      inviteUsers(data: InviteUsersInput!): [EventInvite!]
      updateEvent(eventId: ID!, data: CreateEventInput!): Event!
    }
`;

export default typeDefs;
