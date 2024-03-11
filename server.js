import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import {
  getStorage,
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const scriptURL =
  "https://script.google.com/macros/s/AKfycbzGvb7iMgNfiFkfPo8vKa-AD5Bpm_tX4CqdTlcDIjvUciYkr2SrUoK6__5FwBL0PygJGQ/exec";
const firebaseConfig = {
  apiKey: "AIzaSyBImgU4VcZ0xNnOTptraxRrJDlq4pywZ5k",
  authDomain: "pdfdown-8e60f.firebaseapp.com",
  projectId: "pdfdown-8e60f",
  storageBucket: "pdfdown-8e60f.appspot.com",
  messagingSenderId: "129822492452",
  appId: "1:129822492452:web:ab7861199c493993de95b1",
  measurementId: "G-ZQZQJ5GJQ0",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", function () {
  const nameSection = document.querySelector(".name");
  const stateSection = document.querySelector(".state");
  const mailSection = document.querySelector(".mail");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const msg = document.getElementById("scsmsg");
  const dwd = document.querySelector(".dwd");
  var states = [
    "Andhra Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Chandigarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Orissa",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "Union Territory",
    "Uttarakhand",
    "West Bengal",
  ];

  var selectElement = document.getElementById("state_select");

  var defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.textContent = "--Select your state--";
  selectElement.appendChild(defaultOption);

  // Create options for each state
  states.forEach(function (state) {
    var option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    selectElement.appendChild(option);
  });

  // Initially hide the loading spinner and sections other than the name section
  loadingSpinner.style.display = "none";
  stateSection.style.display = "none";
  mailSection.style.display = "none";

  document.getElementById("name_next").addEventListener("click", function (e) {
    e.preventDefault();

    // Show loading spinner
    loadingSpinner.style.display = "inline-block";

    // Simulate some asynchronous operation (e.g., fetching data)
    setTimeout(() => {
      // Hide loading spinner
      loadingSpinner.style.display = "none";

      // Hide name section
      nameSection.style.display = "none";

      // Show state section
      stateSection.style.display = "flex";
    }, 1500); // You can replace this with actual logic or remove the timeout for immediate transition
  });

  document.getElementById("state_next").addEventListener("click", function (e) {
    e.preventDefault();

    // Show loading spinner
    loadingSpinner.style.display = "inline-block";

    // Simulate some asynchronous operation (e.g., fetching data)
    setTimeout(() => {
      // Hide loading spinner
      loadingSpinner.style.display = "none";

      // Hide state section
      stateSection.style.display = "none";

      // Show email section
      mailSection.style.display = "flex";
    }, 1500); // You can replace this with actual logic or remove the timeout for immediate transition
  });

  const form = document.forms["submit-to-google-sheet"];

  function sendgreet() {
    const name=document.getElementById("name");
    const email = document.getElementById("email");
    let emailbody = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        /* Basic styles */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #8453ff75;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
			text-align: center;
        }
        h1, p {
            margin-top: 0;
        }
        /* Button styles */
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #250023;
            color: #fff;
            text-decoration: none;
            border-radius: 3px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
		<iframe src="https://drive.google.com/file/d/1P2NnIdFeTrlcCTrWRnqdn6PpeZr9MY7E/preview" width="100" height="100" allow="autoplay"></iframe>
        <h1> Welcome to the community! 🎉</h1>
        <p>Dear ${name.value},</p>
        <p>Thank you for visiting our site. We're excited to have you on board!</p>
        <p>Stay tuned for exciting updates, promotions, and news from our company.</p>
        <p>If you have any questions or feedback, feel free to contact us.</p>
        <p>Best regards,</p>
        <p><b>India 4.0 Technologies</b></p>
        <a href="#" class="btn">Unsubscribe</a>
    </div>
</body>
</html>

    `;
    Email.send({
      SecureToken: "b04ccac7-9f85-4a10-857b-bcd277bbafba",
      To: email.value,
      From: "info@india4o.com",
      Subject: "Subscription added!",
      Body: emailbody,
    }).then((message) => console.log(message));
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    loadingSpinner.style.display = "inline-block";

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        sendgreet();
        msg.style.display = "block";

        loadingSpinner.style.display = "none";
        mailSection.style.display = "none";
        form.style.display = "none";
        var list = document.querySelectorAll("#front_only");
        for (var i = list.length - 1; 0 <= i; i--)
          if (list[i] && list[i].parentElement) {
            list[i].parentElement.removeChild(list[i]);
          }
        document.getElementById("checkout").innerHTML = "Here is your File!";
        dwd.style.display = "block";
      })
      .catch((error) => {
        console.error("Error!", error.message);
      });
  });

  dwd.addEventListener("click", () => {
    const selectedState = form.elements["State"].value;

    let pdfPath = "";
    switch (selectedState) {
      case "TamilNadu":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/TN201718.pdf";
        break;
      case "Kerela":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/KERELA2014.pdf";
        break;
      case "Andhra Pradesh":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/AP201819.pdf";
        break;
      case "Chandigarh":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/Chandigarh_2017_18.pdf";
        break;
      case "Assam":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/ASS201819.pdf";
        break;
      case "Bihar":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/BR201718.pdf";
        break;
      case "Chhattisgarh":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/Chattisgarh2016-17.pdf+";
        break;
      case "Goa":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/GOA.pdf";
        break;
      case "Delhi":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/GOA.pdf";
        break;
      case "Gujarat":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/Gujarat201819.pdf";
        break;
      case "Haryana":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/HARYANA.pdf";
        break;
      case "Jammu & Kashmir":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/J&K ARRTariff2013-14.pdf";
        break;
      case "Jharkhand":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/JH201819.pdf";
        break;
      case "Karnataka":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/KA201819.pdf";
        break;
      case "Maharastra":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/MAHARASTRA20182019.pdf";
        break;
      case "Madhya Pradesh":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/MP201718.pdf";
        break;
      case "Orissa":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/ORISSA201819.pdf";
        break;
      case "Punjab":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/PB201718.pdf";
        break;
      case "Rajasthan":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/RAJASTHAN201718.pdf";
        break;
      case "Telangana":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/TG2017-18.pdf";
        break;
      case "Uttar Pradesh":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/UP201718.pdf";
        break;
      case "Union Territory":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/UnionTet201718.pdf";
        break;
      case "Uttarakhand":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/Uttarakhand201718.pdf";
        break;
      case "West Bengal":
        pdfPath = "gs://pdfdown-8e60f.appspot.com/WB201718.pdf";
        break;

      default:
        console.error("Invalid state selected");
        return;
    }
    const pdfRef = ref(storage, pdfPath);
    getDownloadURL(pdfRef)
      .then((url) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = "pdf_file.pdf"; // You can set the desired filename here
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error getting download URL:", error);
      });
  });
});
