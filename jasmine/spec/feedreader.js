/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        it('feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

/* loops through each feed in the allFeeds object and ensures it has a URL
 defined and that the URL is not empty.*/

         it("urls are defined", function(){
           for(var i=0;i<allFeeds.length;i++){
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url.length).not.toBe(0);
           };
         });

/* loops through each feed in the allFeeds object and ensures it has a name
defined and that the name is not empty.*/

         it("names are defined", function(){
           for(var i=0;i<allFeeds.length;i++){
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
           };
         });

    });

/* The menu element is hidden by default. You'll have to analyze the HTML and
the CSS to determine how we're performing the hiding/showing of the menu element.*/
         describe("The Menu", function(){
           it("menu element is hidden", function(){
             expect($("body").hasClass("menu-hidden")).toEqual(true);
           });


/*  The menu changes visibility when the menu icon is clicked. This test
should have two expectations: does the menu display when
clicked and does it hide when clicked again*/

          it("toggle on click event",function(){
            $(".menu-icon-link").trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(false);
            $(".menu-icon-link").trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(true);
          });

        });
/* when the loadFeed  function is called and completes its work, there is at least
a single .entry element within the .feed container.Remember, loadFeed() is
asynchronous so this test will require the use of Jasmine's beforeEach and
 asynchronous done() function.*/

         describe("Initial Entries",function(){
           beforeEach(function(done){
             loadFeed(0,function(){
               done();
             });
           });
            it("define if feed has atleast a single entry",function(){
              expect($(".feed .entry").length).toBeGreaterThan(0);
            });
         });



/*when a new feed is loaded by the loadFeed function that the content actually
changes. Remember, loadFeed() is asynchronous.*/

         describe("New Feed Selection",function(){
           var firstFeed,secondFeed;

           beforeEach(function(done){
             loadFeed(0,function(){
               firstFeed=$(".feed").html();
             loadFeed(1,function(){
               secondFeed=$(".feed").html();
                 done();
           });

         });
       });
         it("new feed is different than old one", function(){
           expect(firstFeed).not.toEqual(secondFeed);
         });
       });

}());
