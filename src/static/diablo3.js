$(function() {
	window.Hero = Backbone.Model.extend({
		urlRoot: '/hero'
	});
	
	window.User = Backbone.Model.extend({
		urlRoot: '/user'
	});
	
	window.HeroView = Backbone.View.extend({
		el: $(".hero-view"),
		
		render: function () {
			var that = this;
			that.hero = new Hero({id: this.model});

			that.hero.fetch({
				success: function(heros) {
					var attr = heros.attributes;
					
					var stats = attr.stats;
					var skills = attr.skills;
					var items = attr.items;
					var followers = attr.followers;
					
					//console.log(stats);
					//console.log(items);
					console.log(skills);
					//console.log(followers);
					
					var template = _.template($('#hero-template').html(), {hero: attr});
					
					$("#hero-view").html(template);
				},
				error: function() {
					$("#hero-view").html("");
					
					console.log("fetch failed");
				}
			})
		},
	});
	
	window.HeroListView = Backbone.View.extend({
		el: $("#diablo3app"),
		
		render: function () {
			var that = this;
			that.user = new  User({id: this.model});

			that.user.fetch({
				success: function(userId) {
					var attr = userId.attributes;
					
					var errorCode = attr.code;
					
					if (errorCode == null)
					{
						var battleTag = attr.battleTag;
						var paragonLevel = attr.paragonLevel;
						var heroes = attr.heroes;
						
						var contents = '';
						
						$.each(heroes, function(index, value) { 
							contents += "<li><button type='button' class='btn btn-danger show' id='" + value.id + "'>" + value.name + "(" + value.class + ")" + " - " + value.level + "</button></li>";
						});
						
						$("#hero-list").html(contents);
					}
					else
					{
						console.log(errorCode);
						console.log(attr.reason);
						
						$("#hero-list").html("");
					}
					
					$("#hero-view").html("");
				},
				error: function() {
					$("#hero-list").html("");
					$("#hero-view").html("");
					
					console.log("fetch failed");
				}
			})
		},
		events: {
			'click .show': 'findHero'
		},
		findHero: function (ev) {
			var heroId = $(ev.currentTarget).attr("id");
			var searchId = this.model + "@hero@" + heroId;
			
			var hereview = new HeroView({model: searchId});
			hereview.render();
	    	
			return false;
		}
	});
	
	window.user = new User;
	
	window.AppView = Backbone.View.extend({
	    el: $("#diablo3app"),
	    
	    events: {
	    	"keypress #search-hero":  "createOnEnter"
	    },
	    
	    createOnEnter: function(e) {
	    	if (e.keyCode != 13) return;
	    	
	    	var inputValue = $("#search-hero").val();
	    	
	    	var listview = new HeroListView({model: inputValue});
	    	listview.render();
	    }
	});

	window.App = new AppView;
});