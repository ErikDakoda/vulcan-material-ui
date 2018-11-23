1.12.8_8 / 2018-11-23
=====================

 * Improved the functionality of the LoadMore component
   * The showNoMore property has been deprecated
   * A showCount property has been added (true by default) that shows a count of loaded and total items
   * The load more icon or button is displayed even when infiniteScroll is enabled
 
1.12.8_7 / 2018-11-10
=====================

 * Fixed bug in Datatable.jsx
 * Updated ReadMe
 
1.12.8_6 / 2018-11-06
=====================

 * Fixed bug in Datatable.jsx
 * Reduced spacing of form components
 
1.12.8_5 / 2018-10-31
=====================

 * Fixed bugs in Datatable pagination
 * Set Datatable paginate prop to false by default
 
1.12.8_4 / 2018-10-31
=====================

 * Removed 'fr_FR.js' from package.js because any french strings loaded activates the french language
 * Fixed delete button and its tooltips positioning in FormSubmit
 * Added pagination to Datatable
 
1.12.8_2 / 2018-10-29
=====================

 * Fixed localization in "clear search" tooltip
 * Added name and aria-haspopup properties to the input component to improve compliance and facilitate UAT
 * Replaced Date, Time and DateTime form controls with native controls as recommended by MUI. 
   The deprecated react-datetime version of the controls are still there as DateRdt, TimeRdt and DateTimeRdt, but they are not registered.
 * Updated readme
 
1.12.8_1 / 2018-10-22
=====================

 * Made form components compatible with new Form.formComponents property
 
1.12.8 / 2018-10-19
===================

 * Made improvements to the search box, including keyboard shortcuts (s: focus search; c: clear search)
 * Added support in TooltipIntl for tooltips in popovers
 * Added action prop to ModalTrigger that enables a parent component to call openModal and closeModal
 * Started using MUI tables in Card component
 * Fixed bugs in MuiSuggest component
