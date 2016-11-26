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
                    $("#added_sort_btn").click(sort_answers);
                }
            }, 200);
        }
    });
}

// This function will sort all currently shown answers by upvotes.
// However, if the question has a lot of answers,
// which will only be loaded later when users scroll down,
// then this function will need to be invoked again (somehow).
function sort_answers() {
    // find all shown_answers
    var answers = $(".AnswerPagedList > .pagedlist_item");
    var shown_answers = answers.not(".pagedlist_hidden");

    shown_answers.detach();

    shown_answers = shown_answers.toArray();

    // find shown_answers' upvotes
    for (var i = 0; i < shown_answers.length; ++i) {
        shown_answers[i].upvotes = $(shown_answers[i]).find(".count").first().text();
        if (shown_answers[i].upvotes.includes("k")) {
            shown_answers[i].upvotes = parseInt(shown_answers[i].upvotes) * 1000;
        }
    }

    // sort the answers by upvotes in decreasing order
    shown_answers.sort(function(a, b) {
        return b.upvotes - a.upvotes;
    });

    for (i = 0; i < shown_answers.length; ++i) {
        d(shown_answers[i].upvotes);
    }

    // reinsert the shown_answers based on upvotes
    // in reverse order because we use before()
    for (i = shown_answers.length - 1; i >= 0; --i) {
        $(".AnswerPagedList").children().first().before(shown_answers[i]);
    }
}
