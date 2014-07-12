define(function() {

/**
 * NumberingSystem( cldr )
 *
 * TODO support ( native | traditional | finance ).
 */
return function( cldr ) {
	return cldr.required.main( "numbers/defaultNumberingSystem" );
};

});
