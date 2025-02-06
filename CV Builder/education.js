const toggleSwitch = document.getElementById("toggleSwitch2");
const yearText = document.getElementById("year-text2");
const end = document.getElementById("end2");

toggleSwitch.addEventListener("change", function () {
  if (!this.checked) {
    yearText.classList.add("d-none");
    end.classList.remove("d-none");
  } else {
    yearText.classList.remove("d-none");
    end.classList.add("d-none");
  }
});
fetch("start.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error in uploading JSON");
    }
    return response.json();
  })
  .then((years) => {
    const selectStart = document.getElementById("start-year2");
    const selectEnd = document.getElementById("end-year2");
    years.forEach((year) => {
      const optionStart = document.createElement("option");
      optionStart.value = year;
      optionStart.textContent = year;
      selectStart.appendChild(optionStart);

      const optionEnd = document.createElement("option");
      optionEnd.value = year;
      optionEnd.textContent = year;
      selectEnd.appendChild(optionEnd);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const [uniResponse, majorsResponse] = await Promise.all([
        fetch('world_universities_and_domains.json'),
        fetch('majors.json')
      ]);

      if (!uniResponse.ok) throw new Error('Failed to load universities data');
      if (!majorsResponse.ok) throw new Error('Failed to load majors data');

      const [universities, majors] = await Promise.all([
        uniResponse.json(),
        majorsResponse.json()
      ]);

      const searchInput = document.getElementById('search-input');
      const searchResults = document.getElementById('search-results');
      const searchInput2 = document.getElementById('search-input2');
      const searchResults2 = document.getElementById('search-results2');

      function displayResults(matches, container, input) {
        container.innerHTML = '';
        if (matches.length === 0) {
          const noResultDiv = document.createElement('div');
          noResultDiv.textContent = 'No results found';
          container.appendChild(noResultDiv);
          return;
        }
        matches.forEach(item => {
          const resultDiv = document.createElement('div');
          resultDiv.textContent = typeof item === 'object' 
            ? `${item.name} - ${item.domains.join(', ')}`
            : item;
          resultDiv.addEventListener('click', () => {
            input.value = typeof item === 'object' ? item.name : item;
            container.innerHTML = '';
          });
          container.appendChild(resultDiv);
        });
      }

      searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const matches = universities.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.domains.some(domain => domain.toLowerCase().includes(query))
        );
        displayResults(matches, searchResults, searchInput);
      });

      searchInput2.addEventListener('input', () => {
        const query = searchInput2.value.toLowerCase();
        if (query.length) searchResults2.innerHTML = '';
        const matches = majors.filter(item =>
          item.toLowerCase().includes(query)
        );
        displayResults(matches, searchResults2, searchInput2);
      });

      document.addEventListener('click', (event) => {
        if (!event.target.closest('#search-container')) {
          searchResults.innerHTML = '';
        }
        if (!event.target.closest('#search-container2')) {
          searchResults2.innerHTML = '';
        }
      });
    } catch (error) {
      console.error('Error:', error);
    }
  });