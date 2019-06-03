const activityList = document.querySelector('.activity-list');

const fetchActivities = (activities) => {
  for (let i = 0; i < activities.length; i++) {
    let activity = activities[i];

    /* beneficiary */
	let beneficiary = document.createElement("h2");
	beneficiary.textContent = activity.beneficiary;

    /* location */
    let place = document.createElement("span");
	place.textContent = activity.location;
	beneficiary.appendChild(place);

	/* date */
	let date = document.createElement("span");
	date.className = "date";
	date.textContent = activity.date;

    /* website */
	let website = document.createElement("a");
	website.href = activity.website;
	website.textContent = 'Vizitează site-ul';

    /* photographs */
	let photographs = activity.photographs;
	let coverImage = document.createElement('img');
	coverImage.src = `./img/${photographs[0]}`;
	coverImage.className = "cover-image";
	
    /* details button */
    let detailsBtn = document.createElement('a');
	detailsBtn.className = 'details-btn btn';
	detailsBtn.textContent = 'Află mai multe';
	detailsBtn.href = './activity.html';
	
    /* list element */
    let activityElement = document.createElement('li');
	let insidePadding = document.createElement('div');
	insidePadding.className = 'inside-padding';
	let textContainer = document.createElement('div');
	textContainer.className = 'text-container';
	textContainer.appendChild(beneficiary);
    textContainer.appendChild(date);
	textContainer.appendChild(detailsBtn);
	insidePadding.appendChild(coverImage);
	insidePadding.appendChild(textContainer);
	activityElement.appendChild(insidePadding);
    activityList.appendChild(activityElement);
  }
}
fetchActivities(activities);