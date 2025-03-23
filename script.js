// Constants for liquidity calculation
const DEFAULT_BASE_TIMESTAMP = 1737318599;
const DEFAULT_BASE_LIQUIDITY = 97233000000000000;
const DEFAULT_GROWTH_RATE = 1.00000000478;

// Function to calculate current liquidity
function calculateLiquidity() {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const secondsElapsed = currentTimestamp - DEFAULT_BASE_TIMESTAMP;
    const currentLiquidity = DEFAULT_BASE_LIQUIDITY * Math.pow(DEFAULT_GROWTH_RATE, secondsElapsed);
    const thousandBillionTomans = currentLiquidity / 10000000000000;
    
    console.log('Current Timestamp:', currentTimestamp);
    console.log('Seconds Elapsed:', secondsElapsed);
    console.log('Current Liquidity:', currentLiquidity);
    console.log('Thousand Billion Tomans:', thousandBillionTomans);
    
    updateDisplay(currentLiquidity, thousandBillionTomans);
}

// Function to update the display with formatted numbers
function updateDisplay(rialValue, tomanValue) {
    // Format numbers with Persian digits and commas
    const rialFormatted = formatNumberPretty(formatNumberPersian(Math.round(rialValue)));
    const tomanFormatted = formatNumberPersian(Math.round(tomanValue));
    
    document.getElementById('rialDisplay').innerHTML = rialFormatted;
    document.getElementById('tomanDisplay').textContent = tomanFormatted;
    
    updateDateTime();
}

// Function to convert numbers to Persian format
function formatNumberPersian(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    
    // First, format the number with commas
    const numWithCommas = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    console.log('Number with Commas:', numWithCommas);
    
    // Then, replace digits with Persian digits
    // const persianFormatted = numWithCommas.replace(/\d/g, function(digit) {
    //     return persianDigits[digit];
    // });
    // console.log('Persian Formatted:', persianFormatted);
    
    return numWithCommas;
}

// Function to update date and time
function updateDateTime() {
    const now = new Date();
    
    const persianDate = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(now);
    
    const persianTime = new Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(now);
    
    document.getElementById('persianDate').textContent = persianDate;
    document.getElementById('persianClock').textContent = persianTime;
}

// Initialize and set interval to update regularly
document.addEventListener('DOMContentLoaded', function() {
    calculateLiquidity();
    setInterval(calculateLiquidity, 1000);
});

function formatNumberPretty(number) {
    let result =   '<span>' + number.toString().split('').join('</span><span>') + '</span>';
    return result.split('<span>,</span>').join('<span class="split">,</span>');
}