function EntityManager(){
	var setA = {}, setB = {}, resultSet = {};

	var entitiesByComponent = {
		'type': {
			entityID: entity
		}
	};

	var id = 0;

	function makeID(){
		return id++;
	}

	this.make = function(component){
		var componentType = component.name;
		var entity = entitiesByComponent[componentType][makeID()] = {};
		entity[componentType] = component;
	};

	this.addComponent = function(){

	};

	this.getAND = function(){
		var componentTypes = Array.prototype.slice.call(arguments);

	};

	this.get = function(type){
		var ret = [];
		var results = entitiesByComponent[type];

	};
}

function RenderableComponent(){
	this.name = "renderable";
}

function intersection(setA, setB, dest){
	$.each(setA, function(k,v){
		if(setB[k] !== undefined) dest[k] = true;
	});
}


var entity = EntityManager.create();
var renderable = new RenderableComponent();
var controls = new ControlsComponent();
EntityManager.set(entity, renderable);


EntityManager.getAND('renderable', 'controls');