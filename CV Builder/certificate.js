let fileInputCount = 1;
let skills = [];

fetch('skills.json')
    .then(response => response.json())
    .then(data => {
        skills = data.skills;
    })
    .catch(error => console.error('Error loading skills:', error));

function validateAndAddFileInput() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    const addFileError = document.getElementById('addFileError');
    const hasFile = Array.from(fileInputs).some(input => input.files.length > 0);

    if (!hasFile) {
        addFileError.style.display = 'block';
    } else {
        addFileError.style.display = 'none';
        addFileInput();
    }
}

function addFileInput() {
    fileInputCount++;
    const newInputDiv = document.createElement('div');
    newInputDiv.className = 'file-input';
    newInputDiv.innerHTML = ` 
        <label for="fileName${fileInputCount}">File Name:</label>
        <input type="text" name="fileName${fileInputCount}" id="fileName${fileInputCount}" placeholder="Name" oninput="updateFileName(${fileInputCount})">
        <label for="file${fileInputCount}">Upload File:</label>
        <div class="file-name-display" id="fileDisplay${fileInputCount}"></div>
        <input type="file" name="file${fileInputCount}" id="file${fileInputCount}" onchange="updateFileName(${fileInputCount})">
    `;
    document.getElementById('additionalInputs').appendChild(newInputDiv);
}

function updateFileName(index) {
    const fileName = document.getElementById(`fileName${index}`).value.trim();
    const fileInput = document.getElementById(`file${index}`);
    const fileDisplay = document.getElementById(`fileDisplay${index}`);

    if (fileInput.files.length > 0) {
        fileDisplay.style.display = 'block';
        fileDisplay.textContent = fileName ? `File Name: ${fileName}` : `File Uploaded: ${fileInput.files[0].name}`;
    } else {
        fileDisplay.style.display = 'none';
    }
}

function showDropdown() {
    skillsDropdown.style.display = 'block';
}

function filterSkills() {
    const query = skillSearch.value.toLowerCase();
    const filtered = skills.filter(skill => skill.toLowerCase().includes(query));
    populateDropdown(filtered);
}

function populateDropdown(filteredSkills) {
    skillsDropdown.innerHTML = '';
    filteredSkills.forEach(skill => {
        const div = document.createElement('div');
        div.textContent = skill;
        div.onclick = () => {
            selectSkill(skill);
        };
        skillsDropdown.appendChild(div);
    });
    skillsDropdown.style.display = 'block';
}

function selectSkill(skill) {
    skillSearch.value = skill;
    skillsDropdown.style.display = 'none';
}

function addSkill() {
    const skill = skillSearch.value.trim();
    const skillLevel = document.getElementById('skill-level').value;
    const skillError = document.getElementById('skillError');

    if (!skill || skillLevel === 'default') {
        skillError.style.display = 'block';
        return;
    } else {
        skillError.style.display = 'none';
    }

    if ([...skillsList.children].some(li => li.dataset.skill === skill)) return;

    const li = document.createElement('li');
    li.dataset.skill = skill;
    li.innerHTML = `
        <span>${skill} - <strong>${skillLevel.charAt(0).toUpperCase() + skillLevel.slice(1)}</strong></span>
        <button type="button" class = "remove-button" onclick="removeSkill(this)">Remove</button>
    `;
    skillsList.appendChild(li);
    skillSearch.value = '';
    document.getElementById('skill-level').value = 'default'; 
}

function removeSkill(button) {
    const li = button.parentElement;
    skillsList.removeChild(li);
}

function submitForm() {
    const fileName = document.getElementById('fileName1').value.trim();
    const fileInput = document.getElementById('file1').files.length;
    const fileError = document.getElementById('fileError');
    let hasError = false;

    if (!fileName || !fileInput) {
        fileError.style.display = 'block';
        hasError = true;
    } else {
        fileError.style.display = 'none';
    }

    if (hasError) {
        alert('Please fill in all required fields.');
        return;
    }

    alert('Form submitted successfully!');
}

document.addEventListener('click', (event) => {
    const isClickInside = document.querySelector('.skills-input').contains(event.target);
    if (!isClickInside) {
        document.getElementById('skillsDropdown').style.display = 'none';
    }
});