app.filter('tagFilter', function() {
	return function(allTags, searchPhrase, existingTags) {
		allTags = _.filter(allTags, function(element) {
			return element.name.indexOf(searchPhrase) > -1 && 
				_.filter(existingTags, function(exitingTag) {
					return exitingTag.name == element.name;
				}).length == 0;
		});
		
		return allTags;
	}
});