import { addStrings, Components } from 'meteor/vulcan:core';
import React from 'react';


addStrings('en', {

  "search.search": "Search",
  "search.clear": "Clear search",
  
  "load_more.load_more": "Load more",
  "load_more.loaded_count": "Loaded {count} of {totalCount}",
  "load_more.loaded_all": "{totalCount, plural, =0 {No items} one {One item} other {# items}}",
  
  "pagination.first_page": "First page",
  "pagination.prev_page": "Previous page",
  "pagination.next_page": "Next page",
  "pagination.last_page": "Last page",
  "pagination.page_x_to_y": "{from}–{to}",
  "pagination.x_items_per_page": "{limit} items per page",
  "pagination.item_count": "{totalCount, plural, =0 {No items} one {One item} other {# items}}",
  "pagination.left_hand_tooltip": "Drag to jump to a page",
  "pagination.right_hand_tooltip": "Drag to change the number of items per page",
  
});
