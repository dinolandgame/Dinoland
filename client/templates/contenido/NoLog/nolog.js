Template.nolog.events({
    "click a#logreg":function(event,template){
		event.preventDefault();
		Modal.show('register'); // abrimos template register
	}
});