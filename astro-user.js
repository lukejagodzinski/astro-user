Items = new Mongo.Collection('items');

Item = Astro.Class({
  name: 'Item',
  collection: Items,
  fields: {
    name: 'string',
    userId: 'string'
  },
  events: {
    beforeInsert: function(e) {
      this.set('userId', Meteor.userId());
    }
  }
});

Meteor.methods({
  '/item/save': function(item) {
    item.save();
  }
});

if (Meteor.isClient) {
  Template.body.helpers({
    items: function() {
      return Items.find();
    }
  });
  Template.body.events({
    'click button': function(e, tmpl) {
      var name = tmpl.find('#name').value;
      var item = new Item();
      item.set({
        name: name
      });
      Meteor.call('/item/save', item);
    }
  });
}
