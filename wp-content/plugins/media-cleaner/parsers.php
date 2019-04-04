<?php

class MeowApps_WPMC_Parsers {

	public function __construct() {
		// require_once( ABSPATH . 'wp-admin/includes/plugin.php' );   // mm change
		require_once( 'parsers/common.php' );
		new MeowApps_WPMC_Parser();

		if ( class_exists( 'WooCommerce' ) )
			require_once( 'parsers/woocommerce.php' );

		if ( class_exists( 'Attachments' ) )  // mm change
			require_once( 'parsers/attachments.php' );

		if ( class_exists( 'ACF' ) )
			require_once( 'parsers/acf.php' );

		if ( function_exists( 'acfw_globals' ) )  // mm change
			require_once( 'parsers/acf_widgets.php' );

		if ( class_exists( 'MetaSliderPlugin' ) || class_exists( 'MetaSliderPro' ) )   // mm change
			require_once( 'parsers/metaslider.php' );
	}
}

?>