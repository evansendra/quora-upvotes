const DEBUG = false;

/**
 * debugging function
 *
 * prints {msg}(any) to the console
 */
function d(msg) {
    if (DEBUG) {
        // add "quora upvotes" prefix so we can use filtering in debugtools
        console.log("quora upvotes: " + msg);
    }
}

$(document).ready(function() {
    var isQuestion = $('h3:contains("Related Questions")').length;

    d("is question = " + isQuestion);

    if (isQuestion) {
        add_sort_btn();
    }

    function sort_questions () {
        var elts = $( ".AnswerPagedList > .pagedlist_item");
        var answers = elts
          .not(".pagedlist_hidden")
          .toArray();
        var hidden_answers = $( ".AnswerPagedList > .pagedlist_hidden" );

        d(Array.isArray(answers));


            for (var i = 0; i < answers.length; ++i) {
                answers[i].upvotes = $( answers[i] ).find( ".count" ).first().text();

                if (answers[i].upvotes.includes("k"))
                    answers[i].upvotes = parseInt(answers[i].upvotes) * 1000;
            }


            if (DEBUG) {
                for (i = 0; i < answers.length; ++i) {
                     console.log(answers[i].upvotes);
                }
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
        var ajaxElem = $( ".AnswerPagedList" ).children().not(".pagedlist_item");
            ajaxElem.detach();

        d("Ajaxy thing: " + String(ajaxElem));

        $( ".AnswerPagedList" ).empty();

        for (i = 0; i < answers.length - 1; ++i) {
            $( ".AnswerPagedList" ).append( answers[i] );
        }

        hidden_answers.each(function() {
          $( ".AnswerPagedList" ).append(this);
        });

        $( ".AnswerPagedList").append(ajaxElem);

    }

});

// This function adds a sort button to the question dropdown list.
function add_sort_btn() {
    $(".overflow_link > a").first().click(function() {
        // only try to add sort_btn when it is not yet added
        if (!$("#added_sort_btn").length) {
            // set a timer to repeatedly trying to add the sort_btn because sometimes
            // Quora is not able able to render the dropdown menu by the time we try
            // to add the sort_btn, thus we keep trying until finally added the btn.
            var add_btn_timer = setInterval(function() {
                d('keep trying to add sort_btn');

                // find the dropdown menu
                var attachTo = $(".overflow_link .menu_list_items").first();

                if (attachTo.find('#added_sort_btn').length > 0) {
                    d('already attached');
                    clearInterval(add_btn_timer);
                } else {
                    d('adding sort_btn');
                    var sort_btn = "<li id='added_sort_btn' class='menu_list_item'>" +
                    "<span class='light_gray'><span><a href='#'>Sort by Votes</a></span></span></li>";

                    attachTo.append(sort_btn);
                    $("#added_sort_btn").click(sort_questions);
                }
            }, 200);
        }
    });
}
