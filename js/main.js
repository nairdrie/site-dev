var urls = [
{"ios": "https://www.rapidsewerdata.com/", "android": "https://www.rapidsewerdata.com/"},
{"ios": "https://itunes.apple.com/us/app/erebus/id1246377046?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.erebus&hl=en_US"},
{"ios": "https://itunes.apple.com/us/app/guardian-adknown-games/id1424607460?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.defender"},
{"ios": "https://itunes.apple.com/ca/app/plunge/id1373937218?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.plunge"},
{"ios": "https://itunes.apple.com/us/app/dodge-bowl/id1372968154?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.dodgebowl"},
{"ios": "https://itunes.apple.com/us/app/retro-sudoku/id1261338257?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.retrosudoku&hl=en_GB"},
{"ios": "https://itunes.apple.com/ca/app/tank-gallery/id1267484580?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.tankgallery"},
{"ios": "https://itunes.apple.com/us/app/starsweeper-adknown-games/id1357740593?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.starsweeper"},
{"ios": "https://itunes.apple.com/us/app/santas-word-search/id1353842679?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.santaswordsearch&hl=en_GB"},
{"ios": "https://itunes.apple.com/us/app/e-racer/id1348803559?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.e_racer&hl=en"},
{"ios": "https://itunes.apple.com/us/app/armada-bomber/id1348871234?mt=8", "android": "https://play.google.com/store/apps/details?id=com.adknown.armadabomber&hl=en"},
{"ios": "https://play.google.com/store/apps/details?id=com.nairdrie.JumpyTrump", "android": "https://play.google.com/store/apps/details?id=com.nairdrie.JumpyTrump"},
{"ios": "https://www.barrielibrary.ca/", "android": "https://www.barrielibrary.ca/"},
{"ios": "https://www.cfht.ca/", "android": "https://www.cfht.ca/"},
{"ios": "http://www.live-electric.ca/", "android": "http://www.live-electric.ca/"},
{"ios": "http://nairdrie.com/snake.html", "android": "http://nairdrie.com/snake.html"},
]

function closeSkills(){
	$('.skill-container').each(function(){
		console.log($(this));
		if($(this).hasClass('expanded')){
			$(this).removeClass('expanded');
		}
		if($(this).hasClass('collapsed')){
			$(this).removeClass('collapsed');
		}
		if($(this).find('.content').hasClass('expanded')){
			$(this).find('.content').removeClass('expanded');
		}
		if($(this).find('.close-skill').hasClass('expanded')){
			$(this).find('.close-skill').removeClass('expanded');
		}
	});

}

function getOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
	if (navigator.appVersion.indexOf("Win")!=-1) return 1;
	if (navigator.appVersion.indexOf("Mac")!=-1) return 0;
	if (navigator.appVersion.indexOf("X11")!=-1) return Math.round(Math.random());
	if (navigator.appVersion.indexOf("Linux")!=-1) return Math.round(Math.random());

	// Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return 1;
	}

	if (/android/i.test(userAgent)) {
		return 0;
	}

	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return 0;
	}

	return Math.round(Math.random());
}


function openLink(index)
{
	if(getOperatingSystem() == 1) {
		window.open(
			urls[index].android,
			'_blank' // <- This is what makes it open in a new window.
		);
	}
	else {
		window.open(
			urls[index].ios,
			'_blank' // <- This is what makes it open in a new window.
		  );
	}
}

$(document).ready(function(){
	if($(window).width() > 992) {
		$('#C, #Java, #Python, #Android-Dev').attr('data-row', '1');
		$('#HTML, #JavaScript, #CSS, #PHP').attr('data-row', '2');
		$('#Adobe, #Office, #Solidworks, #Linux').attr('data-row', '3');
	} else if($(window).width() > 768) {
		$('#C, #Java').attr('data-row', '1');
		$('#Python, #Android-Dev').attr('data-row', '2');
		$('#HTML, #JavaScript').attr('data-row', '3');
		$('#CSS, #PHP').attr('data-row', '4');
		$('#Adobe, #Office').attr('data-row', '5');
		$('#Solidworks, #Linux').attr('data-row', '6');
	} else {
		$('#C').attr('data-row', '1');
		$('#Java').attr('data-row', '2');
		$('#Python').attr('data-row', '3');
		$('#Android-Dev').attr('data-row', '4');
		$('#HTML').attr('data-row', '5');
		$('#JavaScript').attr('data-row', '6');
		$('#CSS').attr('data-row', '7');
		$('#PHP').attr('data-row', '8');
		$('#Adobe').attr('data-row', '9');
		$('#Office').attr('data-row', '10');
		$('#Solidworks').attr('data-row', '11');
		$('#Linux').attr('data-row', '12');
	}
	$(window).resize(function(){
		if($(window).width() > 992) {
			$('#C, #Java, #Python, #Android-Dev').attr('data-row', '1');
			$('#HTML, #JavaScript, #CSS, #PHP').attr('data-row', '2');
			$('#Adobe, #Office, #Solidworks, #Linux').attr('data-row', '3');
		} else if($(window).width() > 768) {
			$('#C, #Java').attr('data-row', '1');
			$('#Python, #Android-Dev').attr('data-row', '2');
			$('#HTML, #JavaScript').attr('data-row', '3');
			$('#CSS, #PHP').attr('data-row', '4');
			$('#Adobe, #Office').attr('data-row', '5');
			$('#Solidworks, #Linux').attr('data-row', '6');
		} else {
			$('#C').attr('data-row', '1');
			$('#Java').attr('data-row', '2');
			$('#Python').attr('data-row', '3');
			$('#Android-Dev').attr('data-row', '4');
			$('#HTML').attr('data-row', '5');
			$('#JavaScript').attr('data-row', '6');
			$('#CSS').attr('data-row', '7');
			$('#PHP').attr('data-row', '8');
			$('#Adobe').attr('data-row', '9');
			$('#Office').attr('data-row', '10');
			$('#Solidworks').attr('data-row', '11');
			$('#Linux').attr('data-row', '12');
		}


		$('.project-container').each(function(){
			$(this).css('height', $(this).width()+'px');
		});


	});

	$('.project-container').each(function(){
		$(this).css('height', $(this).width()+'px');
	});




	$('.close-skill').click(function(e){
		e.stopPropagation();
		closeSkills();

	});

	$('.skill-container').click(function(){
		closeSkills();
		$(this).addClass('expanded');
		$(this).find('.content').addClass('expanded');
		$(this).find('.close-skill').addClass('expanded');
		$('[data-row=' + $(this).attr('data-row') + ']').each(function(){
			if(!$(this).hasClass('expanded'))
				$(this).addClass('collapsed');
		});
	});

	$('.more-info').click(function() {
		$(this).parents('.project').find('.info-pane').slideToggle();
		$(this).parent().toggleClass('open');
	});


	//VIDEO CONTROLS


	//SCROLLING RESUME
	window.setTimeout(function(){
		var mySwiper = new Swiper (".swiper-container", {
			// Optional parameters
			loop: true,
			autoplay:8000,
			pagination:".swiper-pagination",
			paginationClickable:true,
			slidesPerView:'auto',
			nextButton:".swiper-right",
			prevButton:".swiper-left"
		}, 100);

	});


	$('.to-top').click(function() {
		window.scrollTo(0,0);
	});
});
