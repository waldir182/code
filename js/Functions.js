let bExternalLink = document.getElementById("external-link");

bExternalLink.addEventListener("click", (event) => {
   let allTabs = document.querySelectorAll('.tab-btn');
   if(allTabs.length <= 0) {
      alert('No ay ventanas abiertas')
      return 0;
   }

   let item = document.querySelector('.tab-btn.active');
   let link = item.querySelector('i').textContent;
	let externalWindow = window.open(link, "_blank");
   console.log(externalWindow);
});
