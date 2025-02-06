document.addEventListener("DOMContentLoaded", () => {
  const jobInput = document.getElementById("job-t");
  const suggestionsContainer = document.getElementById("suggestions");
  let jobs = [];

  fetch("job.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in uploading json file");
      }
      return response.json();
    })
    .then((data) => {
      jobs = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  function showSuggestions(filteredJobs) {
    suggestionsContainer.innerHTML = "";

    if (filteredJobs.length === 0) {
      const noResult = document.createElement("div");
      noResult.textContent = "No job found!";
      noResult.style.color = "red";
      suggestionsContainer.appendChild(noResult);
      return;
    }

    filteredJobs.forEach((job) => {
      const suggestion = document.createElement("div");
      suggestion.textContent = job;
      suggestion.style.cursor = "pointer";
      suggestion.addEventListener("click", () => {
        jobInput.value = job;
        suggestionsContainer.innerHTML = "";
      });
      suggestionsContainer.appendChild(suggestion);
    });
  }

  jobInput.addEventListener("input", () => {
    const query = jobInput.value.trim().toLowerCase();
    if (query === "") {
      suggestionsContainer.innerHTML = "";
      return;
    }

    const filteredJobs = jobs.filter((job) =>
      job.toLowerCase().includes(query)
    );
    showSuggestions(filteredJobs);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#suggestions") && e.target !== jobInput) {
      suggestionsContainer.innerHTML = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("start.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in uploading start.json");
      }
      return response.json();
    })
    .then((data) => {
      const startYearSelect = document.getElementById("start-year");
      const endYearSelect = document.getElementById("end-year");

      data.forEach((year) => {
        const startOption = document.createElement("option");
        startOption.value = year;
        startOption.textContent = year;
        startYearSelect.appendChild(startOption);

        const endOption = document.createElement("option");
        endOption.value = year;
        endOption.textContent = year;
        endYearSelect.appendChild(endOption);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  const toggleSwitch = document.getElementById("toggleSwitch");
  const endMonth = document.getElementById("end-month");
  const endYear = document.getElementById("end");
  const yearText = document.getElementById("year-text");
  const endMonthSelect = document.getElementById("end-month-select");
  const endYearSelect = document.getElementById("end-year");

  toggleSwitch.addEventListener("change", () => {
    if (toggleSwitch.checked) {
      endMonth.classList.add("no-visible");
      endYear.classList.add("no-visible");
      setTimeout(() => {
        endMonth.classList.add("d-none");
        endYear.classList.add("d-none");
        yearText.classList.remove("d-none");
        yearText.classList.remove("no-visible");
      }, 300);
    } else {
      yearText.classList.add("no-visible");
      setTimeout(() => {
        yearText.classList.add("d-none");
        endMonth.classList.remove("d-none");
        endYear.classList.remove("d-none");
        endMonth.classList.remove("no-visible");
        endYear.classList.remove("no-visible");
      }, 300);
      setTimeout(() => {}, 300);
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const jobInput = document.getElementById("job-t");
  const suggestionsContainer = document.getElementById("suggestions");
  let jobs = [];

  fetch("job.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in loading job data");
      }
      return response.json();
    })
    .then((data) => {
      jobs = data; 
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  function showSuggestions(filteredJobs) {
    suggestionsContainer.innerHTML = ""; 

    if (filteredJobs.length === 0) {
      const noResult = document.createElement("div");
      noResult.textContent = "No job found!";
      noResult.style.color = "red";
      suggestionsContainer.appendChild(noResult);
      suggestionsContainer.style.display = "block";
      return;
    }

    filteredJobs.forEach((job) => {
      const suggestion = document.createElement("div");
      suggestion.textContent = job;
      suggestion.addEventListener("click", () => {
        jobInput.value = job;
        suggestionsContainer.innerHTML = "";
        suggestionsContainer.style.display = "none"; 
      });
      suggestionsContainer.appendChild(suggestion);
    });

    suggestionsContainer.style.display = "block"; 
  }

  jobInput.addEventListener("input", () => {
    const query = jobInput.value.trim().toLowerCase();
    if (query === "") {
      suggestionsContainer.innerHTML = "";
      suggestionsContainer.style.display = "none";
      return;
    }

    const filteredJobs = jobs.filter((job) =>
      job.toLowerCase().includes(query)
    );
    showSuggestions(filteredJobs);
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#job-title") && e.target !== jobInput) {
      suggestionsContainer.innerHTML = "";
      suggestionsContainer.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("fieldset"); 
  const inputs = form.querySelectorAll("input, textarea, select"); 

  inputs.forEach((input, index) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const nextInput = inputs[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    });
  });
});
