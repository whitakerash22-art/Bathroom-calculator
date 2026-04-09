const form = document.getElementById('calculatorForm');
const steps = [...document.querySelectorAll('.step')];
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const formError = document.getElementById('formError');
const progressFill = document.getElementById('progressFill');
const stepLabel = document.getElementById('stepLabel');
const resultsSection = document.getElementById('results');
const resultRange = document.getElementById('resultRange');
const startCalculatorBtn = document.getElementById('startCalculatorBtn');
const calculatorSection = document.getElementById('calculatorSection');

let currentStep = 0;
const totalSteps = steps.length;

const baseRanges = {
  Cosmetic: [8000, 15000],
  Standard: [15000, 25000],
  Full: [25000, 45000],
};

const multipliers = {
  bathroomType: {
    'Powder Room': 0.85,
    'Guest Bathroom': 1,
    'Primary Bathroom': 1.25,
  },
  layoutChanges: {
    'No, keeping everything in place': 1,
    'Maybe minor adjustments': 1.1,
    'Yes, moving plumbing': 1.25,
  },
  finishLevel: {
    Practical: 0.95,
    'Mid-range': 1.08,
    Premium: 1.2,
  },
  timeline: {
    ASAP: 1.12,
    '1-3 months': 1.05,
    '3-6 months': 1,
  },
};

function getScopeValues() {
  return [...form.querySelectorAll('input[name="scope"]:checked')].map((el) => el.value);
}

function getFieldValue(name) {
  const selected = form.querySelector(`[name="${name}"]:checked`);
  return selected ? selected.value : '';
}

function showStep(index) {
  steps.forEach((step, idx) => step.classList.toggle('active', idx === index));
  backBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
  nextBtn.textContent = index === totalSteps - 1 ? 'See My Estimate' : 'Next';
  progressFill.style.width = `${((index + 1) / totalSteps) * 100}%`;
  stepLabel.textContent = `Step ${index + 1} of ${totalSteps}`;
  formError.textContent = '';
}

function validateCurrentStep() {
  const activeStep = steps[currentStep];

  if (activeStep.querySelector('input[data-group-required="scope"]')) {
    if (getScopeValues().length === 0) {
      formError.textContent = 'Please choose at least one scope item.';
      return false;
    }
  }

  const requiredInputs = [...activeStep.querySelectorAll('[required]')];
  for (const input of requiredInputs) {
    if (input.type === 'radio') {
      if (!activeStep.querySelector(`[name="${input.name}"]:checked`)) {
        formError.textContent = 'Please select one option to continue.';
        return false;
      }
      continue;
    }

    if (input.type === 'checkbox') {
      continue;
    }

    if (!input.value.trim()) {
      formError.textContent = 'Please complete all fields to continue.';
      return false;
    }

    if (input.type === 'email' && !input.checkValidity()) {
      formError.textContent = 'Please enter a valid email address.';
      return false;
    }
  }

  return true;
}

function currency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateEstimate() {
  const projectLevel = getFieldValue('projectLevel');
  const [baseMin, baseMax] = baseRanges[projectLevel];

  let totalMultiplier = 1;
  for (const [field, map] of Object.entries(multipliers)) {
    const selected = getFieldValue(field);
    if (selected) totalMultiplier *= map[selected] || 1;
  }

  const scopeCount = getScopeValues().length;
  if (scopeCount >= 3) totalMultiplier *= 1.1;
  else if (scopeCount === 2) totalMultiplier *= 1.05;

  const budget = getFieldValue('budget');
  if (budget === 'Under $15k') totalMultiplier *= 0.92;
  if (budget === '$25k+') totalMultiplier *= 1.12;

  const min = Math.round((baseMin * totalMultiplier) / 500) * 500;
  const max = Math.round((baseMax * totalMultiplier) / 500) * 500;
  const cappedMax = projectLevel === 'Full' ? `${currency(max)}+` : currency(max);

  return `${currency(min)} – ${cappedMax}`;
}

function renderResults() {
  resultRange.textContent = calculateEstimate();
  form.classList.add('hidden');
  resultsSection.classList.remove('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

nextBtn.addEventListener('click', () => {
  if (!validateCurrentStep()) return;
  if (currentStep === totalSteps - 1) return renderResults();
  currentStep += 1;
  showStep(currentStep);
});

backBtn.addEventListener('click', () => {
  if (currentStep === 0) return;
  currentStep -= 1;
  showStep(currentStep);
});

startCalculatorBtn.addEventListener('click', () => {
  calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

showStep(currentStep);
