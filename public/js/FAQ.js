let tl_links_bg=gsap.timeline({scrollTrigger:{trigger:"main",start:"7.5%",end:"12.5%",scrub:1}});tl_links_bg.fromTo(".navlinks",{filter:"blur(0px)","background-color":"rgba(70, 10, 22, 0)","box-shadow":"none"},{filter:"blur(1000px),","background-color":"rgb(70, 10, 22)","box-shadow":"10px 10px 15px 1px rgb(70, 10, 22, .8)"});