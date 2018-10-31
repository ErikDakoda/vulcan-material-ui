1.12.8_4 / 2018-10-31
=====================

 * Removed 'fr_FR.js' from package.js because any french strings loaded activates the french language
 * Fixed delete button and its tooltips positioning in FormSubmit
 
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
