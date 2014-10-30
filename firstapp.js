var Person = Backbone.Model.extend({

	defaults: {
		name: "John Doe",
		age: 22,
		occupation: "worker"
		},
	
	validate: function(attrs){
		if(attrs.age<0){
			return "age must be positive";
			};
		if(!attrs.name){
			return 'person must have name';
			};
		},
	work: function(){
		return this.get('name') + "is working";
		}
});
	
var PeopleCollection = Backbone.Collection.extend({
model: Person
});	

//view for all people
var PeopleView = Backbone.View.extend({
	tagName: 'ul',
	initialize: function(){
		console.log(this.collection);
		},
	render: function(){
		//filter through all items in a collection
		this.collection.each(function(person) {
		//for each, create a new PersonView
		
		var personView = new PersonView({model: person});
		this.$el.append(personView.render().el);
		//append to root element
		}, this);
		return this;
		}
		
});

var PersonView = Backbone.View.extend({
	tagName: 'li',
	
	template: _.template($('#personTemplate').html()),

	render: function(){
		this.$el.html(this.template(this.model.toJSON()) );
		//bind model(in JSON format) to function called .html() so that stuff appears in html format
		return this;
		}

});

var person = new Person();
var personView = new PersonView({model: person});
var peopleCollection = new PeopleCollection([
{
	name: 'Joe Stein',
	age: 27
},
{
	name: 'John Doe',
	age: 22,
	occupation: 'Marketer'
},
{	name: 'Manny Rods',
	age: 33,
	occupation: 'Graphic Designer'
}
]);

var peopleView = new PeopleView({collection: peopleCollection});
$(document.body).append(peopleView.render().el);

</script>