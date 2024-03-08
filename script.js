function submitForm(event)
{
  event.preventDefault();

  if (!validateForm()) 
  {
    return;
  }

  console.log("Form submitted successfully!");
  console.log(getFormData());

  document.getElementById('jobApplicationForm').style.display = 'none';
  document.getElementById('successMessage').style.display = 'block';
}

function validateForm() 
{
  const requiredFields = document.querySelectorAll('input[required], textarea[required]');
  let isValid = true;

  requiredFields.forEach(field => 
  {
    if (!field.value.trim()) 
    {
      isValid = false;
      field.classList.add('error');
    } else 
    {
      field.classList.remove('error');
    }
  });

  return isValid;
}

function getFormData() 
{
  const formData = {};
  const formElements = document.getElementById('jobApplicationForm').elements;

  for (let i = 0; i < formElements.length; i++) 
  {
    const element = formElements[i];
    if (element.type !== 'submit') 
    {
      formData[element.name] = element.value;
    }
  }

  return formData;
}

function viewApplications() 
{
  const formData = getFormData();
  const tableBody = document.querySelector('#applicationsTable tbody');
  tableBody.innerHTML = '';

  const fullNameRow = document.createElement('tr');
  const fullNameFieldCell = document.createElement('td');
  const fullNameValueCell = document.createElement('td');
  fullNameFieldCell.textContent = 'Full Name';
  fullNameValueCell.textContent = `${formData['firstName']} ${formData['lastName']}`;
  fullNameRow.appendChild(fullNameFieldCell);
  fullNameRow.appendChild(fullNameValueCell);
  tableBody.appendChild(fullNameRow);

  const addressRow = document.createElement('tr');
  const addressFieldCell = document.createElement('td');
  const addressValueCell = document.createElement('td');
  addressFieldCell.textContent = 'Address';
  addressValueCell.textContent = `${formData['street']}, ${formData['city']}, ${formData['state']}, ${formData['zip']}`;
  addressRow.appendChild(addressFieldCell);
  addressRow.appendChild(addressValueCell);
  tableBody.appendChild(addressRow);

  const resumeRow = document.createElement('tr');
  const resumeFieldCell = document.createElement('td');
  const resumeValueCell = document.createElement('td');
  resumeFieldCell.textContent = 'Resume';
  resumeValueCell.textContent = document.getElementById('resume').files[0].name;
  resumeRow.appendChild(resumeFieldCell);
  resumeRow.appendChild(resumeValueCell);
  tableBody.appendChild(resumeRow);

  const certificatesRow = document.createElement('tr');
  const certificatesFieldCell = document.createElement('td');
  const certificatesValueCell = document.createElement('td');
  certificatesFieldCell.textContent = 'Certificates';
  certificatesValueCell.textContent = document.getElementById('certificates').files[0].name;
  certificatesRow.appendChild(certificatesFieldCell);
  certificatesRow.appendChild(certificatesValueCell);
  tableBody.appendChild(certificatesRow);

  const formFields = document.querySelectorAll('#jobApplicationForm input[type="text"], #jobApplicationForm input[type="tel"], #jobApplicationForm input[type="email"], #jobApplicationForm input[type="date"], #jobApplicationForm textarea');
  
  formFields.forEach(field => 
  {
    const row = document.createElement('tr');
    const fieldCell = document.createElement('td');
    const valueCell = document.createElement('td');
    
    fieldCell.textContent = field.placeholder || field.name;
    valueCell.textContent = field.value;

    row.appendChild(fieldCell);
    row.appendChild(valueCell);
    tableBody.appendChild(row);
  });

  // Display the table
  document.getElementById('applicationsTable').style.display = 'block';
}

