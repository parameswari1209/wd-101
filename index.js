let userdata1 = document.getElementById("user-data");

const GETDATA = () => {
  let DISPLAYDATAGET = localStorage.getItem("user_entries");

  if (DISPLAYDATAGET) {
    DISPLAYDATAGET = JSON.parse(DISPLAYDATAGET);
  } else {
    DISPLAYDATAGET = [];
  }

  return DISPLAYDATAGET;
};

let user_entries = GETDATA();

const displaydata = () => {
  const DISPLAYDATAGET = GETDATA();

  const tabledata = DISPLAYDATAGET
    .map((entrydata) => {
      const NAMEFIELD = `<td >${entrydata.NAME}</td>`;
      const EMAILFIELD = `<td >${entrydata.EMAIL}</td>`;
      const passwordfield = `<td >${entrydata.password}</td>`;
      const dobfield = `<td >${entrydata.dob}</td>`;
      const tcfield = `<td >${entrydata.tc}</td>`;

      const rowfield = `<tr> ${NAMEFIELD} ${EMAILFIELD} ${passwordfield} ${dobfield} ${tcfield} </tr>`;

      return rowfield;
    })
    .join("\n");

  const table = `<table  class = "table-auto w-full" ><tr>
  
  <th >NAME</th>
  <th >EMAIL</th>
  <th >Password</th>
  <th >Dob</th>
  <th >Accepted terms?</th>

  </tr> ${tabledata} 
  </table>`;

  let details = document.getElementById("output");
  details.innerHTML = table;
};

const saveuserdata1 = (event) => {
  event.preventDefault();

  const NAME = document.getElementById("NAME").value;

  const EMAIL = document.getElementById("EMAIL").value;

  const password = document.getElementById("password").value;

  const dob = document.getElementById("dob").value;

  const tc = document.getElementById("tc").checked;

  const entry = {
    NAME,
    EMAIL,
    password,
    dob,
    tc,
  };

  user_entries.push(entry);

  localStorage.setItem("user_entries", JSON.stringify(user_entries));

  displaydata();
};

userdata1.addEventListener("submit", saveuserdata1);
displaydata();

const EMAIL = document.getElementById("EMAIL");

EMAIL.addEventListener("input", () => valid(EMAIL));

const sub = document.getElementById("sbutton");

sub.addEventListener("click", () => valid(EMAIL));

function valid(element) {
  const checkEMAIL = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (EMAIL.value == "" || !checkEMAIL.test(EMAIL.value)) {
    element.setCustomValidity("The EMAIL is not correct ");
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}

const dob = document.getElementById("dob");

dob.addEventListener("input", () => validatedob(dob));

sub.addEventListener("click", () => validatedob(dob));

function validatedob(element) {
  const newtoday = new Date();
  const dobDatenew = new Date(dob.value);
  const ageinms = newtoday - dobDatenew;
  const agey = ageinms / 1000 / 60 / 60 / 24 / 365.25;

  if (agey < 18 || agey > 55) {
    element.setCustomValidity(
      "Age should be Greater than 18 and less than 55 "
    );
    element.reportValidity();
  } else {
    element.setCustomValidity("");
  }
}
