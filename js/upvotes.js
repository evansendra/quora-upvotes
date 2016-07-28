$(document).ready(function() {
    const DEBUG = false;

    /**
     * debugging function
     *
     * prints {msg}(any) to the console
     */
    function d(msg) {
        if (DEBUG) console.log(msg);
    }

    var isQuestion = $('h3:contains("Related Questions")').length;
    d(isQuestion);
    if ( isQuestion )
    {
        d( "is question" );

        $(".overflow_link > a").first().click(function() {
            d('made it');
            
            var sort_btn = "<li id='added_sort_btn' class='menu_list_item'>" +
            "<span class='light_gray'><span><a href='#'>Sort by Votes</a></span></span></li>";

            var add_btn_timer = setInterval(function() {
                var attachTo = $(".overflow_link .menu_list_items").first();
                d('keep trying to add button');
                if ( attachTo.find('#added_sort_btn').length > 0 )
                {
                    d('already attached');
                    clearInterval(add_btn_timer);
                }
                else
                {
                    attachTo.append(sort_btn);
                    d($('.unified_menu').size());
                }

                $( "#added_sort_btn" ).click( function() {
                    sort_questions();
                });
            }, 200);
        });
        
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