import expect from "expect";
import {Meteor} from "meteor/meteor";
import {Notes} from "./notes";

if (Meteor.isServer) {
  describe("notes", function() {
    it("should insert new note", function() {
      const userId = "testid"
      const _id = Meteor.server.method_handlers["notes.insert"].apply({userId});
      expect(Notes.findOne({_id, userId})).toExist();
    });

    it("should not insert new note if not authenticated", function() {
      expect(() => {
        Meteor.server.method_handlers["notes.insert"]();
      }).toThrow();
    })
  });
}
