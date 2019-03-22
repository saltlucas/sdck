<?php

add_action( 'wpmc_scan_widgets', 'wpmc_scan_widgets_metaslider' );

function wpmc_scan_widgets_metaslider() {
	global $wpmc;
	$widgets_ids = array();
	wpmc_get_images_from_metaslider( $widgets_ids );
	$wpmc->add_reference_id( $widgets_ids, 'METASLIDER (ID)' );  // mm change
}

function wpmc_get_images_from_metaslider( &$ids ) {
	global $wpdb;
	$q = "SELECT object_id
		FROM {$wpdb->term_relationships}
		WHERE object_id > 0
		AND term_taxonomy_id
		IN (SELECT term_taxonomy_id FROM wp_term_taxonomy WHERE taxonomy = 'ml-slider');";
	$imageIds = $wpdb->get_col( $q );
	if ( $wpdb->last_error ) {
		error_log( $q . " " . $wpdb->last_error );
		$this->log( $q . " " . $wpdb->last_error );
		die( $wpdb->last_error );
	}
	if ( count( $imageIds) > 0 ) {
		$ids = array_merge( $ids, $imageIds );
	}
}

?>