<!DOCTYPE html>

<html>
<head>
    <!-- Required meta tags-->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta name="apple-mobile-web-app-capable" content="yes">
	<link rel="apple-touch-icon" href="img/apple-touch-icon.png">

    <title>Hospital Finder</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/framework7/3.6.1/css/framework7.css" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/framework7/3.6.1/css/framework7.ios.css" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css"><!-- Path to your custom app styles-->
    <link rel="stylesheet" href="css/appulance.hospitals.css" type="text/css">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/framework7/3.6.1/js/framework7.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.googlemap.js"></script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-60890786-6"></script>
	<script>
		window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date()); gtag('config', 'UA-60890786-6');
	</script>
</head>

<body>
    <!-- App root element -->

    <div id="finder" class="color-theme-black">
        <!-- Statusbar overlay -->

        <div class="statusbar"></div><!-- Your main view, should have "view-main" class -->

        <div class="view view-main">
            <!-- Initial Page, "data-name" contains page name -->

            <div data-name="home" class="page">
                <!-- Top Navbar -->

                <div class="navbar">
                    <div class="navbar-inner">
	                    <div class="left">
		                    <a href="#" class="link popover-open" data-popover=".popover-about"><span>About</span></a>
		                 </div>
	                    
                        <div class="title">
                            Hospital Finder
                        </div>

                        <div class="right">
                            <a href="#" class="link popover-open" data-popover=".popover-find" id="find-address"><span>Find Address</span></a>
                        </div>
                    </div>
                </div><!-- Scrollable page content -->

                <div class="page-content" id="map"></div>
            </div>
        </div>

        <div class="sheet-modal" id="location-info">
            <div class="toolbar">
                <div class="toolbar-inner">
                    <div class="left" id="location-info-title">#location-info-title</div>

                    <div class="right">
                        <a href="#" class="link sheet-close">Done</a>
                    </div>
                </div>
            </div><!-- Sheet Modal Inner -->

            <div class="sheet-modal-inner">
                <!-- Sheet Modal content -->

                <div class="block" id="hospital-info-body">
	                <script type="text/template" data-template="hospital-route-item">
			            <div class="hospital-route ${to}" data-id="${to}" data-time-secs="${ticks}">
		                    <h2>${to}</h2>
		                    <div class="hospital-route-time">${time_in_traffic} in traffic</div>
		                    <div class="hospital-route-details">
			                    <div class="hospital-route-details-distance">${distance}</div>
			                    <div class="hospital-route-details-time">${time}</div>
		                    </div>
	                    </div>
					</script>
                </div>
            </div>
        </div>

        <div class="sheet-modal" id="hospital-info">
            <div class="toolbar">
                <div class="toolbar-inner">
                    <div class="left" id="hospital-info-title">#hospital-info-title</div>

                    <div class="right">
                        <a href="#" class="link sheet-close">Done</a>
                    </div>
                </div>
            </div><!-- Sheet Modal Inner -->

            <div class="sheet-modal-inner">
                <!-- Sheet Modal content -->

                <div class="block" id="hospital-info-body">
					<p>#hospital-info-body</p>
                </div>
            </div>
        </div>

		<div class="popover popover-about" style="min-width: 300px;">
			<div class="popover-inner">
				<div style="margin: 20px auto -20px; text-align: center;"><img src="/ga/images/appulance-128.png"  /></div>
				
				<div class="block-title">About</div>
				<div class="block block-strong">
					<div class = "content-block-inner">
						Crafted with love in Carina by <a href="//adamroe.me/">Adam Roe</a>.
					</div>
				</div>
				
				<div class="block-title">HELP!</div>
				<div class="block block-strong">
					<div class = "block-inner">
						<a class="button" id="reload-app">Try reloading first!</a>
					</div>
				</div>
				<div class="block block-strong" style="margin-top: -36px;">
					<div class = "block-inner">
						<strong>via email</strong>: <a href="mailto:adam.roe@me.com">adam.roe@me.com</a></br>
						<strong>via Twitter</strong>: <a href="//twitter.com/xadammr">@xadammr</a>
					</div>
				</div>
				
				<div class="block-title">Share this App!</div>
				<div class="block block-strong">
					<div class = "block-inner">
						Know someone who might be interested?</br>
						Send them to <a href="//appulance.com/finder" style="font-weight: bold;">appulance.com/finder</a>. 
					</div>
				</div>
			</div>
		</div>

        <div class="popover popover-find">
            <div class="popover-inner">
                <div class="block" style="margin: 15px 0;">
                    <div style="margin: 10px -15px 10px; padding: 0;">
                        <div class="block block-strong row">
                            <button class="col button button-fill" id="add-current-location">Use Current Location</button>
                        </div>

                        <div class="block-title">
                            Address
                        </div>

                        <form class="list" id="address-input">
                            <ul>
                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-input-wrap">
                                            <input type="text" name="country" placeholder="Country" value="Australia" disabled class="">
                                        </div>
                                    </div>
                                </li>

                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-input-wrap">
                                            <input type="text" name="state" placeholder="State" value="Queensland" disabled class="">
                                        </div>
                                    </div>
                                </li>

                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-input-wrap">
                                            <input type="text" name="suburb" placeholder="Suburb" class="">
                                        </div>
                                    </div>
                                </li>

                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-input-wrap">
                                            <input type="text" name="street" placeholder="Street" class="">
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </form>

                        <div class="block row" style="margin-top: 15px">
                            <button class="col button button-fill" id="search-for-address">Search</button> <button class="col button button-fill" id="fill-form-from-data">Fill</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div><!-- Path to your app js-->
    <script type="text/javascript" src="js/appulance.finder.js"></script>
    <script type="text/javascript" src="js/appulance.finder.util.js"></script>
    <script type="text/javascript" src="js/appulance.Address.js"></script>
    <script type="text/javascript" src="js/appulance.Hospital.js"></script>
    <script type="text/javascript" src="js/appulance.Google.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCy4vSvwn9v5UIybzEPrcLYoZCR9NtInP4"></script>
</body>
</html>
