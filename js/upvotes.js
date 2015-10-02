$(document).ready(function() {
	var DEBUG = true;

	if ( $(".related_questions" ).length )
	{
		if (DEBUG)
			console.log( "is question" );	

		var sort_btn = "<li id='added_sort_btn' class='menu_list_item'>" +
		"<span class='light_gray'><span><a href='#'>Sort by Votes</a></span></span></li>";

		$('.hover_menu_contents > .menu_list_items').first().append(sort_btn);
	}

	function sort_questions () {
		var answers = $( ".AnswerPagedList > .pagedlist_item" ).toArray();
		if (DEBUG)
			console.log(Array.isArray(answers));

		for (var i = 0; i < answers.length; ++i) {
			answers[i].upvotes = $( answers[i] ).find( ".count" ).first().text();

			if (answers[i].upvotes.includes("k"))
				answers[i].upvotes = parseInt(answers[i].upvotes) * 1000;
		}


		for (i = 0; i < answers.length; ++i) {
			if (DEBUG)
				console.log(answers[i].upvotes);
		}

		// sort the oject of answer elements by upvotes
		answers.sort( function(a, b) {
			if (DEBUG)
			{
				console.log(typeof a.upvotes);
				console.log(a.upvotes);
			}

			return b.upvotes - a.upvotes;
		});

		// re render the elements based on upvote sort	
		$( ".AnswerPagedList" ).empty();

		for (i = 0; i < answers.length - 1; ++i) {
			$( ".AnswerPagedList" ).append(	answers[i] );
		}

	}

	$( "#added_sort_btn" ).click( function() {
		sort_questions();
	});

});