/**
 * Question Bank - Analiza Algoritmilor
 * Conține întrebările extrase din variantele de examen A, B, C, D (Soluții parțial 2025/2026).
 * 
 * Structura suportă două tipuri de întrebări:
 * 1. type: "multiple_choice" (grilă)
 *    - options: tablou cu opțiunile posibile
 *    - correctIndices: tablou de indici corecți [0, 2] sau index unic
 * 2. type: "open_ended" (întrebare cu răspuns liber / text deschis)
 *    - sampleAnswer: răspunsul corect din PDF (text / LaTeX / cod)
 *    - user can enter their own answer, compare it and self-evaluate.
 * 
 * Fiecare întrebare conține:
 * - category: categoria principală de grupare în meniu
 * - topic: tema specifică
 * - title: descriere scurtă pentru afișare în meniul de navigare
 */

const questions = [
  // ==========================================================
  // GRUPUL 1: Analiza Complexității & Algoritmi
  // ==========================================================
  {
    id: 1,
    category: "Analiza Complexității & Algoritmi",
    topic: "Analiza Complexității Buclelor",
    title: "Complexitate bucle for imbricate cu printf",
    source: "Parțial - Varianta A (Grila 1) / B (Grila 4)",
    type: "multiple_choice",
    question: "Fie următorul fragment de cod și $T(n)$ funcția care mapează variabila $n$ la numărul de operații elementare realizate (comparații, incrementări, atribuiri etc.). În care dintre următoarele mulțimi se află $T(n)$?",
    code: `for (int k = n - 100; k <= n + 100; k++)
    for (int i = 1; i <= n; i = i * 2)
        for (int j = 1; j <= n; j += i)
            printf("Hello!\\n");`,
    options: [
      "A. $\\Theta(n \\log n)$",
      "B. $o(n^2)$",
      "C. $O(\\sqrt{n})$",
      "D. $O(\\log n)$",
      "E. $\\Omega(\\log n)$",
      "F. $\\Theta(n)$"
    ],
    correctIndices: [1, 4, 5], // B, E, F
    explanation: "Bucla exterioară după $k$ rulează de exact 201 ori (constant, $\\Theta(1)$). Pentru buclele interioare: pentru fiecare pas $i = 2^p$ cu $i \\le n$, bucla după $j$ se execută de $\\approx n/i$ ori. Totalul operațiilor este $\\sum_{p=0}^{\\lfloor \\log_2 n \\rfloor} \\frac{n}{2^p} = n \\sum_{p=0}^{\\log n} \\frac{1}{2^p} = \\Theta(n)$. Deoarece $T(n) \\in \\Theta(n)$, ea aparține de asemenea și mulțimilor $o(n^2)$ și $\\Omega(\\log n)$."
  },
  {
    id: 7,
    category: "Analiza Complexității & Algoritmi",
    topic: "Analiză Algoritmi - Turneu",
    title: "Turneu cu înjumătățire jucători la fiecare rundă (2ⁿ inițial)",
    source: "Parțial - Varianta A (Grila 7) / B (Grila 7)",
    type: "multiple_choice",
    question: "Într-un turneu, la fiecare rundă sunt evaluați toți jucătorii rămași, apoi jumătate sunt eliminați. Costul evaluării este proporțional cu numărul de jucători. Dacă la început sunt $2^n$ jucători, care este timpul total de evaluare?",
    code: null,
    options: [
      "A. $\\Theta(n 2^n)$",
      "B. $\\Theta(2^n \\log n)$",
      "C. $\\Theta(\\log n)$",
      "D. $\\Theta(n)$",
      "E. $\\Theta(2^n)$",
      "F. $\\Theta(n \\log n)$"
    ],
    correctIndices: [4], // E (în B_sol este D: Theta(2^n))
    explanation: "La runda 0 sunt $2^n$ jucători, la runda 1 sunt $2^{n-1}$, până la 1 jucător. Costul total este proporțional cu seria geometrică: $2^n + 2^{n-1} + \\dots + 2 + 1 = 2^{n+1} - 1 = \\Theta(2^n)$."
  },
  {
    id: 12,
    category: "Analiza Complexității & Algoritmi",
    topic: "Analiză Algoritmi - Turneu",
    title: "Turneu cu eliminare a câte un singur jucător per rundă",
    source: "Parțial - Varianta C (Grila 3) / D (Grila 3)",
    type: "multiple_choice",
    question: "Într-un turneu, la fiecare rundă sunt evaluați toți jucătorii rămași, apoi unul este eliminat. Costul evaluării este proporțional cu numărul de jucători. Dacă la început sunt $n$ jucători, care este timpul total de evaluare?",
    code: null,
    options: [
      "A. $\\Theta(n \\log n)$",
      "B. $\\Theta(n 2^n)$",
      "C. $\\Theta(n^2)$",
      "D. $\\Theta(n)$",
      "E. $\\Theta(2^n)$",
      "F. $\\Theta(\\log n)$"
    ],
    correctIndices: [2], // C (în C_sol) / E (în D_sol): Theta(n^2)
    explanation: "La fiecare rundă este eliminat un singur jucător, deci numărul de jucători evaluați descrește cu 1: $n + (n-1) + (n-2) + \\dots + 1 = \\frac{n(n+1)}{2} = \\Theta(n^2)$."
  },
  {
    id: 18,
    category: "Analiza Complexității & Algoritmi",
    topic: "Analiza Algoritmilor - Căutare Modificată",
    title: "Căutare modificată cu pași st++, dr-- în loc de înjumătățire",
    source: "Parțial - Varianta C (Grila 9) / D (Grila 9)",
    type: "multiple_choice",
    question: "Fie următorul fragment de cod, în care știm sigur că vectorul $v$ este sortat crescător:<br>Și $T(n)$ funcția care mapează dimensiunea array-ului la numărul de operații elementare realizate (comparații, incrementări, atribuiri etc.). În care dintre următoarele mulțimi se află $T(n)$?",
    code: `int search(int *v, int n, int x) {
    int st = 0, dr = n - 1;
    while (st <= dr) {
        int mij = (st + dr) / 2;
        if (v[mij] == x) return mij;
        if (v[mij] < x) st++;
        else dr--;
    }
    return -1;
}`,
    options: [
      "A. $o(\\log n)$",
      "B. $\\Theta(\\log n)$",
      "C. $o(n)$",
      "D. $O(n^2)$",
      "E. $\\Theta(n)$",
      "F. $\\Omega(\\log n)$"
    ],
    correctIndices: [3, 4, 5], // D, E, F în C_sol / B, D, F în D_sol: O(n^2), Theta(n), Omega(log n)
    explanation: "Observați că la pașii `st++` și `dr--` intervalul nu se înjumătățește la $mij$, ci scade cu doar 1 la fiecare iterație! Prin urmare, în cel mai rău caz bucla se execută de $\\Theta(n)$ ori. Deoarece $T(n) \\in \\Theta(n)$, ea aparține mulțimilor $\\Theta(n)$, $O(n^2)$ și $\\Omega(\\log n)$."
  },

  // ==========================================================
  // GRUPUL 2: Analiză Amortizată
  // ==========================================================
  {
    id: 3,
    category: "Analiză Amortizată",
    topic: "Analiză Amortizată",
    title: "Cost mediu inserare 80 elemente cu triplare capacitate",
    source: "Parțial - Varianta A (Grila 3) / B (Grila 5)",
    type: "multiple_choice",
    question: "Presupunem un ArrayList care, la umplere, își triplează capacitatea. Pornim de la capacitate = 1 și număr elemente = 0. Care este costul mediu pentru introducerea a 80 de elemente? (costul inserției = 1, costul copierii unui element = 1)",
    code: null,
    options: [
      "A. $c \\approx 2$",
      "B. $c \\approx 2.5$",
      "C. $c \\approx 1.5$",
      "D. $c \\approx 3$",
      "E. $c \\approx 3.5$",
      "F. $c \\approx 1$"
    ],
    correctIndices: [2], // C
    explanation: "Redimensionările (triplările capacității) au loc când se depășește capacitatea: la elementul 2 (copiază 1, cap devine 3), la elementul 4 (copiază 3, cap devine 9), la elementul 10 (copiază 9, cap devine 27), la elementul 28 (copiază 27, cap devine 81). Capacitatea 81 acoperă toate cele 80 de elemente.<br>Cost total copieri = $1 + 3 + 9 + 27 = 40$.<br>Cost total inserții brute = 80.<br>Cost total = $80 + 40 = 120$.<br>Cost mediu per operație = $120 / 80 = 1.5$."
  },
  {
    id: 9,
    category: "Analiză Amortizată",
    topic: "Analiză Amortizată: Dynamic Array",
    title: "Cost amortizat dublare la plin și înjumătățire la 1/4 plin",
    source: "Parțial - Varianta A (Grila 9) / B (Grila 6)",
    type: "multiple_choice",
    question: "Într-un array care se dublează când e plin și se înjumătățește când e 1/4 plin:",
    code: null,
    options: [
      "A. inserarea unui element are cost amortizat $O(1)$",
      "B. eliminarea ultimului element are cost amortizat $O(n)$",
      "C. eliminarea ultimului element are cost amortizat $O(1)$",
      "D. inserarea unui element are cost amortizat $O(n)$"
    ],
    correctIndices: [0, 2], // A, C
    explanation: "Strategia cu pragul de înjumătățire la 1/4 (și reducere la capacitate/2) previne comportamentul de oscilație (thrashing) la limita de plin/gol. Astfel, atât inserarea cât și ștergerea la sfârșit au un cost amortizat constant $O(1)$."
  },
  {
    id: 11,
    category: "Analiză Amortizată",
    topic: "Analiză Amortizată: Metoda Potențialului",
    title: "Funcție de potențial validă pentru contor ternar",
    source: "Parțial - Varianta C (Grila 2) / D (Grila 6)",
    type: "multiple_choice",
    question: "Se dă un contor ternar de $n$ triți (echivalentul bitului, dar cu trei valori: 0, 1, 2) cu operația `increment`.<br>Exemplu:<br><code>Stare: Di: 2 0 1 0 1 2 2 -> Di+1: 2 0 1 0 2 0 0</code><br>Pentru analiza amortizată a operației de increment asupra contorului, care dintre următoarele funcții poate fi considerată o funcție de potențial validă? ('#' indică 'numărul de')",
    code: null,
    options: [
      "A. $\\Phi(D_i) = \\#(2\\text{-uri}) - \\#(0\\text{-uri})$",
      "B. $\\Phi(D_i) = \\#(0\\text{-uri})$",
      "C. $\\Phi(D_i) = \\#(2\\text{-uri})$",
      "D. $\\Phi(D_i) = \\#(1\\text{-uri}) - \\#(2\\text{-uri})$",
      "E. $\\Phi(D_i) = \\#(1\\text{-uri})$",
      "F. $\\Phi(D_i) = \\#(2\\text{-uri}) - \\#(1\\text{-uri})$"
    ],
    correctIndices: [2], // C (în C_sol) / B (în D_sol): Phi(Di) = #(2-uri)
    explanation: "La operația de incrementare, propagarea transportului (carry) transformă toate valorile consecutive de 2 de la dreapta spre stânga în 0, iar primul trit diferit de 2 (0 sau 1) este incrementat. Fiecare 2 resetat compensează costul de transport. Alegând $\\Phi(D_i) = \\#(2\\text{-uri})$, potențialul este întotdeauna $\\ge 0$ și $\\Delta\\Phi = 1 - k$, unde $k$ este numărul de 2-uri resetate la 0. Astfel costul amortizat devine constant $O(1)$."
  },
  {
    id: 14,
    category: "Analiză Amortizată",
    topic: "Analiză Amortizată: Redimensionare Array",
    title: "Reguli de redimensionare pentru cost amortizat constant",
    source: "Parțial - Varianta C (Grila 5) / D (Grila 5)",
    type: "multiple_choice",
    question: "Pentru a avea cost amortizat constant atât pentru operațiile de inserare cât și de ștergere a ultimului element, un array cu $n$ elemente și capacitate $c$ trebuie să respecte:",
    code: null,
    options: [
      "A. $c \\leftarrow 2c$ când $c = n$",
      "B. $c \\leftarrow c + 1$ când $c = n$",
      "C. $c \\leftarrow c/4$ când $c = n/4$",
      "D. $c \\leftarrow c + 2$ când $c = n$",
      "E. $c \\leftarrow c/2$ când $c = n/4$",
      "F. $c \\leftarrow c/2$ când $c = n/2$"
    ],
    correctIndices: [0, 2, 4], // A, C, E în C_sol / A, D, F în D_sol (c <- 2c când c=n și c <- c/2 când c=n/4 sau c <- c/4)
    explanation: "Pentru cost amortizat constant:<br>• La umplere ($c = n$), capacitatea se dublează: $c \\leftarrow 2c$.<br>• La golire, reducerea capacității la jumătate ($c \\leftarrow c/2$) trebuie făcută la un sfert de umplere ($c = n/4$, respectiv când numărul de elemente $n = c/4$), pentru a evita oscilația la prag."
  },
  {
    id: 16,
    category: "Analiză Amortizată",
    topic: "Analiză Amortizată: Inserare Listă Sortată",
    title: "Validitatea costului amortizat constant la inserare în listă sortată",
    source: "Parțial - Varianta C (Grila 7) / D (Grila 4)",
    type: "multiple_choice",
    question: "Fie $L$ o listă sortată, $\\text{ins}$ operația care introduce un element în lista sortată și $S$ o secvență de $n$ operații de inserare. Care dintre următoarele afirmații sunt adevărate?",
    code: null,
    options: [
      "A. Putem demonstra că $c = 3$ este un cost amortizat valid pentru ins.",
      "B. Putem găsi un cost amortizat valid cu valoare mai mică decât cel real.",
      "C. Putem demonstra că $c = 4$ este un cost amortizat valid pentru ins.",
      "D. Putem demonstra că $c = 2$ este un cost amortizat valid pentru ins.",
      "E. niciuna dintre celelalte",
      "F. costul mediu per operație este $O(1)$"
    ],
    correctIndices: [4], // E în C_sol / B în D_sol: niciuna dintre celelalte
    explanation: "Inserarea într-o listă sortată simplu înlănțuită de lungime $k$ necesită în cel mai rău caz parcurgerea tuturor celor $k$ elemente, costul total pentru $n$ inserții fiind $\\sum_{k=1}^n k = \\Theta(n^2)$. Costul amortizat per operație este $\\Theta(n)$, nu este o constantă fixă ($O(1)$, 2, 3 sau 4). Prin urmare, 'niciuna dintre celelalte' este răspunsul corect."
  },

  // ==========================================================
  // GRUPUL 3: Notații Asimptotice
  // ==========================================================
  {
    id: 2,
    category: "Notații Asimptotice",
    topic: "Notații Asimptotice",
    title: "Funcții care se află în o(n)",
    source: "Parțial - Varianta A (Grila 2) / B (Grila 2)",
    type: "multiple_choice",
    question: "Care din următoarele funcții se află în $o(n)$?",
    code: null,
    options: [
      "A. $w(n) = 4n + 2$",
      "B. $u(n) = \\sqrt{n}$",
      "C. $v(n) = n \\log n$",
      "D. $r(n) = 2n$",
      "E. $s(n) = \\log n$",
      "F. $t(n) = 8$"
    ],
    correctIndices: [1, 4, 5], // B, E, F
    explanation: "O funcție $f(n) \\in o(n)$ dacă $\\lim_{n \\to \\infty} \\frac{f(n)}{n} = 0$.<br>• $\\lim \\frac{\\sqrt{n}}{n} = 0 \\implies u(n) \\in o(n)$<br>• $\\lim \\frac{\\log n}{n} = 0 \\implies s(n) \\in o(n)$<br>• $\\lim \\frac{8}{n} = 0 \\implies t(n) \\in o(n)$."
  },
  {
    id: 15,
    category: "Notații Asimptotice",
    topic: "Notații Asimptotice",
    title: "Funcții care se află în Ω(1)",
    source: "Parțial - Varianta C (Grila 6) / D (Grila 8)",
    type: "multiple_choice",
    question: "Care dintre următoarele funcții se află în $\\Omega(1)$?",
    code: null,
    options: [
      "A. $t(n) = 8$",
      "B. $s(n) = \\log n$",
      "C. $r(n) = 4n^2$",
      "D. $w(n) = 1$",
      "E. $v(n) = 2^n$",
      "F. $u(n) = \\sqrt{n}$"
    ],
    correctIndices: [0, 1, 2, 3, 4, 5], // Toate sunt în Omega(1)!
    explanation: "$\\Omega(1)$ reprezintă mulțimea funcțiilor măărginite inferior de o constantă strict pozitivă pentru $n$ suficient de mare (adică există $c > 0$ astfel încât $f(n) \\ge c$). Toate funcțiile specificate ($8, 1, \\log n, \\sqrt{n}, 4n^2, 2^n$) sunt $\\ge 1$ pentru $n \\ge 2$, deci toate se află în $\\Omega(1)$."
  },
  {
    id: 21,
    category: "Notații Asimptotice",
    topic: "Notații Asimptotice: Relații între Mulțimi",
    title: "Descriere asimptotică pentru mulțimea ω(n³)/Θ(n)",
    source: "Parțial - Varianta A (Întrebarea 12) / B (Întrebarea 15)",
    type: "open_ended",
    question: "Folosiți o notație asimptotică pentru a descrie următoarea mulțime de funcții:<br>$$\\frac{\\omega(n^3)}{\\Theta(n)}$$<br><i>(sau raportul asimptotic al claselor $\\omega(n^3) / \\Theta(n)$)</i>",
    code: null,
    sampleAnswer: "ω(n^2)",
    explanation: "Dacă $f(n) \\in \\omega(n^3)$ și $g(n) \\in \\Theta(n)$, atunci raportul $f(n)/g(n)$ crește asimptotic mai repede decât $\\frac{n^3}{n} = n^2$. Prin urmare, mulțimea rezultată este $\\omega(n^2)$."
  },
  {
    id: 22,
    category: "Notații Asimptotice",
    topic: "Notații Asimptotice: Exemple de Funcții",
    title: "Exemplu de funcție din Ω(n) care nu este în ω(n)",
    source: "Parțial - Varianta A (Întrebarea 13) / B (Întrebarea 12)",
    type: "open_ended",
    question: "Dați un exemplu de funcție din $\\Omega(n)$ care nu este în $\\omega(n)$.",
    code: null,
    sampleAnswer: "f(n) = n",
    explanation: "Funcția $f(n) = n$ (sau orice $c \\cdot n$) aparține lui $\\Theta(n)$, deci este în $\\Omega(n)$. Totuși, $\\lim_{n \\to \\infty} \\frac{n}{n} = 1 \\ne \\infty$, așadar nu aparține lui $\\omega(n)$."
  },
  {
    id: 25,
    category: "Notații Asimptotice",
    topic: "Notații Asimptotice: Relații între Mulțimi",
    title: "Descriere asimptotică pentru mulțimea Ω(n⁴)/Θ(n²)",
    source: "Parțial - Varianta C (Întrebarea 10) / D (Întrebarea 10)",
    type: "open_ended",
    question: "Folosiți o notație asimptotică pentru a descrie următoarea mulțime de funcții:<br>$$\\frac{\\Omega(n^4)}{\\Theta(n^2)}$$",
    code: null,
    sampleAnswer: "Ω(n^2)",
    explanation: "Dacă $f(n) \\in \\Omega(n^4)$ și $g(n) \\in \\Theta(n^2)$, raportul $f(n)/g(n)$ este mărginit inferior asimptotic de $\\frac{n^4}{n^2} = n^2$. Prin urmare, mulțimea de funcții este $\\Omega(n^2)$."
  },
  {
    id: 29,
    category: "Notații Asimptotice",
    topic: "Notații Asimptotice: Exemple de Funcții",
    title: "Exemplu de funcție din O(n²) care nu este în Θ(n²)",
    source: "Parțial - Varianta C (Întrebarea 14) / D (Întrebarea 12)",
    type: "open_ended",
    question: "Dați un exemplu de funcție din $O(n^2)$ care nu este în $\\Theta(n^2)$.",
    code: null,
    sampleAnswer: "f(n) = n",
    explanation: "Funcția $f(n) = n$ (sau $f(n) = 1$, $f(n) = n \\log n$) este mărginită superior de $c \\cdot n^2$, deci aparține lui $O(n^2)$. Totuși, nu este mărginită inferior de $n^2$ ($\\lim \\frac{n}{n^2} = 0$), deci nu aparține lui $\\Theta(n^2)$."
  },

  // ==========================================================
  // GRUPUL 4: Relații de Recurență & Teorema Master
  // ==========================================================
  {
    id: 5,
    category: "Relații de Recurență & Teorema Master",
    topic: "Teorema Master",
    title: "Recurențe rezolvabile cu Teorema Master (Set 1)",
    source: "Parțial - Varianta A (Grila 5) / B (Grila 1)",
    type: "multiple_choice",
    question: "Care recurențe pot fi rezolvate cu Teorema Master?",
    code: null,
    options: [
      "A. $T(n) = T(\\sqrt{n}/2) + \\text{sqrt}(n)$",
      "B. $T(n) = T(\\sqrt{n}) + 1$",
      "C. $T(n) = 2T(n/2) + n$",
      "D. $T(n) = 4T(n/4) + n^3$",
      "E. $T(n) = T(n - 1) + 1$",
      "F. $T(n) = T(n/2) + n/2$"
    ],
    correctIndices: [2, 3, 5], // C, D, F (în B sunt A, D, E corespunzătoare)
    explanation: "Forma standard a Teoremei Master este $T(n) = aT(n/b) + f(n)$ cu constante $a \\ge 1$, $b > 1$ și $f(n)$ funcție polinomială/asimptotic pozitivă.<br>• $2T(n/2) + n$: $a=2, b=2$ (Master valabil)<br>• $4T(n/4) + n^3$: $a=4, b=4$ (Master valabil)<br>• $T(n/2) + n/2$: $a=1, b=2$ (Master valabil)<br>Recurențele cu $\\sqrt{n}$ sau $n-1$ nu se pot rezolva direct cu forma clasică a teoremei Master."
  },
  {
    id: 6,
    category: "Relații de Recurență & Teorema Master",
    topic: "Relații de Recurență",
    title: "Recurență algoritm max Divide et Impera (două apeluri n/2)",
    source: "Parțial - Varianta A (Grila 6) / B (Grila 9)",
    type: "multiple_choice",
    question: "Ce relație de recurență caracterizează codul următor?",
    code: `int max(const int *a, int lo, int hi) {
    if (lo == hi) return a[lo];
    int mid = (lo + hi) / 2;
    int left = max(a, lo, mid);
    int right = max(a, mid + 1, hi);
    return (left > right) ? left : right;
}`,
    options: [
      "A. $T(n) = 2T(n - 1) + \\Theta(1)$",
      "B. $T(n) = 2T(n - 1) + \\Theta(n)$",
      "C. $T(n) = 2T(n/2) + \\Theta(n)$",
      "D. $T(n) = T(n/2) + \\Theta(n)$",
      "E. $T(n) = T(n/2) + \\Theta(1)$",
      "F. $T(n) = 2T(n/2) + \\Theta(1)$"
    ],
    correctIndices: [5], // F (în B_sol este C: 2T(n/2) + Theta(1))
    explanation: "Algoritmul împarte intervalul curent de lungime $n = hi - lo + 1$ în două jumătăți de dimensiune $\\approx n/2$ și apelează recursiv funcția de două ori: `max(a, lo, mid)` și `max(a, mid + 1, hi)`. În afara apelurilor recursive se efectuează doar calcule de mijloc și o comparație finală, adică $\\Theta(1)$. Așadar, $T(n) = 2T(n/2) + \\Theta(1)$."
  },
  {
    id: 13,
    category: "Relații de Recurență & Teorema Master",
    topic: "Relații de Recurență",
    title: "Recurență algoritm max recursiv liniar pe lo + 1",
    source: "Parțial - Varianta C (Grila 4) / D (Grila 7)",
    type: "multiple_choice",
    question: "Ce relație de recurență caracterizează codul următor?",
    code: `int max(const int *a, int lo, int hi) {
    if (lo == hi) return a[lo];
    int max_r = max(a, lo + 1, hi);
    return (a[lo] > max_r) ? a[lo] : max_r;
}`,
    options: [
      "A. $T(n) = T(n/2) + \\Theta(n)$",
      "B. $T(n) = T(n/2) + \\Theta(1)$",
      "C. $T(n) = 2T(n - 1) + \\Theta(n)$",
      "D. $T(n) = T(n - 1) + \\Theta(n)$",
      "E. $T(n) = 2T(n - 1) + \\Theta(1)$",
      "F. $T(n) = T(n - 1) + \\Theta(1)$"
    ],
    correctIndices: [5], // F (în C_sol) / B (în D_sol): T(n-1) + Theta(1)
    explanation: "Funcția face un singur apel recursiv pe subintervalul de la `lo + 1` la `hi`, care are lungimea $n - 1$. Operațiile adiționale (comparația și returnarea) se realizează în timp constant $\\Theta(1)$. Așadar, relația este $T(n) = T(n - 1) + \\Theta(1)$."
  },
  {
    id: 17,
    category: "Relații de Recurență & Teorema Master",
    topic: "Teorema Master",
    title: "Recurențe rezolvabile cu Teorema Master (Set 2)",
    source: "Parțial - Varianta C (Grila 8) / D (Grila 2)",
    type: "multiple_choice",
    question: "Care recurențe pot fi rezolvate cu Teorema Master?",
    code: null,
    options: [
      "A. $T(n) = 4T(n/4) + n^4$",
      "B. $T(n) = T(n/\\log n) + \\log n$",
      "C. $T(n) = 2T(n - 1) + n$",
      "D. $T(n) = 3T(n/4) + n^{3/4}$",
      "E. $T(n) = 2T(\\sqrt{n}) + n$",
      "F. $T(n) = nT(n/4) + 1$"
    ],
    correctIndices: [0, 3], // A, D în C_sol / B, E în D_sol: 4T(n/4) + n^4 și 3T(n/4) + n^{3/4}
    explanation: "• $T(n) = 4T(n/4) + n^4$ are $a=4, b=4$ și $f(n) = n^4$ (se aplică Cazul 3 al Teoremei Master).<br>• $T(n) = 3T(n/4) + n^{3/4}$ are $a=3, b=4$ și $f(n) = n^{3/4} = n^{\\log_4 3}$ (se aplică Cazul 2 al Teoremei Master).<br>Recurențele cu împărțire la $\\log n$, cu $\\sqrt{n}$, cu $n-1$ sau cu $a(n) = n$ (neprecizat constant) nu se pot rezolva cu Teorema Master."
  },
  {
    id: 23,
    category: "Relații de Recurență & Teorema Master",
    topic: "Relații de Recurență",
    title: "Rezolvare recurență T(n) = 4T(n/4) + n",
    source: "Parțial - Varianta A (Întrebarea 14) / B (Întrebarea 14)",
    type: "open_ended",
    question: "Ce complexitate (notație $\\Theta$) are recurența: $$T(n) = 4T(n/4) + n$$ ?",
    code: null,
    sampleAnswer: "Θ(n log n)",
    explanation: "Conform Teoremei Master, avem $a = 4$, $b = 4$ și $f(n) = n$.<br>Calculăm pragul $n^{\\log_b a} = n^{\\log_4 4} = n^1 = n$.<br>Deoarece $f(n) = \\Theta(n) = \\Theta(n^{\\log_b a})$, ne situăm în Cazul 2 al Teoremei Master.<br>Prin urmare, $T(n) = \\Theta(n \\log n)$."
  },
  {
    id: 28,
    category: "Relații de Recurență & Teorema Master",
    topic: "Relații de Recurență",
    title: "Rezolvare recurență T(n) = 4T(n/2) + n",
    source: "Parțial - Varianta C (Întrebarea 13) / D (Întrebarea 11)",
    type: "open_ended",
    question: "Ce complexitate (notație $\\Theta$) are recurența: $$T(n) = 4T(n/2) + n$$ ?",
    code: null,
    sampleAnswer: "Θ(n^2)",
    explanation: "Conform Teoremei Master, $a = 4$, $b = 2$, $f(n) = n$.<br>Calculăm $n^{\\log_b a} = n^{\\log_2 4} = n^2$.<br>Deoarece $f(n) = n = O(n^{2 - \\epsilon})$ pentru $\\epsilon = 1$, ne situăm în Cazul 1 al Teoremei Master.<br>Prin urmare, $T(n) = \\Theta(n^2)$."
  },

  // ==========================================================
  // GRUPUL 5: Specificare Algebrică & Inducție
  // ==========================================================
  {
    id: 8,
    category: "Specificare Algebrică & Inducție",
    topic: "Specificare Algebrică (TDA List)",
    title: "Combinație corectă de axiome isSorted pe TDA List",
    source: "Parțial - Varianta A (Grila 8) / B (Grila 8)",
    type: "multiple_choice",
    question: "Alegeți combinația corectă de axiome pentru operația $\\text{isSorted} : \\text{List} \\to \\text{Boolean}$:",
    code: null,
    options: [
      "A. $\\text{isSorted}(\\text{Void}) = \\text{false}$",
      "B. $\\text{isSorted}(\\text{Void}) = \\text{true}$",
      "C. $\\text{isSorted}(\\text{Cons}(x, \\text{Void})) = \\text{true}$",
      "D. $\\text{isSorted}(\\text{Cons}(x, \\text{Void})) = \\text{false}$",
      "E. $\\text{isSorted}(\\text{Cons}(x, \\text{Cons}(y, xs))) = x \\le y \\;\\&\\&\\; \\text{isSorted}(xs)$",
      "F. $\\text{isSorted}(\\text{Cons}(x, \\text{Cons}(y, xs))) = x \\le y \\;\\&\\&\\; \\text{isSorted}(\\text{Cons}(y, xs))$"
    ],
    correctIndices: [1, 2, 5], // B, C, F
    explanation: "• Lista vidă este sortată: $\\text{isSorted}(\\text{Void}) = \\text{true}$<br>• Lista cu un singur element este sortată: $\\text{isSorted}(\\text{Cons}(x, \\text{Void})) = \\text{true}$<br>• Pentru cel puțin două elemente, verificăm $x \\le y$ și recursiv lista începând de la $y$: $\\text{isSorted}(\\text{Cons}(x, \\text{Cons}(y, xs))) = x \\le y \\;\\&\\&\\; \\text{isSorted}(\\text{Cons}(y, xs))$."
  },
  {
    id: 19,
    category: "Specificare Algebrică & Inducție",
    topic: "Specificare Algebrică (TDA BTree)",
    title: "Axiomele operatorului mirror pentru TDA BTree",
    source: "Parțial - Varianta A (Întrebarea 10) / B (Întrebarea 11)",
    type: "open_ended",
    question: "Fie un TDA BTree cu constructorii:<br><code>Nil : BTree</code><br><code>Node : Z × BTree × BTree → BTree</code><br>Completați axiomele operatorului <code>mirror</code> care oglindește un arbore binar:<br><br><code>mirror(Nil) = ...</code><br><code>mirror(Node(x, l, r)) = ...</code>",
    code: null,
    sampleAnswer: `mirror(Nil) = Nil
mirror(Node(x, l, r)) = Node(x, mirror(r), mirror(l))`,
    explanation: "• Arborele vid oglindit rămâne vid: <code>mirror(Nil) = Nil</code>.<br>• Un nod cu rădăcina $x$, subarborele stâng $l$ și subarborele drept $r$ devine un nod cu aceeași valoare $x$, având ca subarbore stâng pe <code>mirror(r)</code> și ca subarbore drept pe <code>mirror(l)</code>."
  },
  {
    id: 24,
    category: "Specificare Algebrică & Inducție",
    topic: "Inducție Structurală",
    title: "Cazul de bază pentru size(l) = size(reverse(l))",
    source: "Parțial - Varianta A (Întrebarea 15) / B (Întrebarea 13)",
    type: "open_ended",
    question: "Scrieți cazul de bază pentru a demonstra prin inducție structurală proprietatea: $$\\text{size}(l) = \\text{size}(\\text{reverse}(l))$$",
    code: null,
    sampleAnswer: "size(Empty) = size(reverse(Empty))",
    explanation: "Pentru cazul de bază se consideră lista vidă (notată <code>Empty</code> sau <code>Void</code>):<br><code>size(Empty) REV1 = size(reverse(Empty))</code><br>Deoarece $\\text{reverse}(\\text{Empty}) = \\text{Empty}$, ambele părți sunt egale cu 0."
  },
  {
    id: 27,
    category: "Specificare Algebrică & Inducție",
    topic: "Specificare Algebrică (TDA BTree)",
    title: "Axiomele operatorului height pentru TDA BTree",
    source: "Parțial - Varianta C (Întrebarea 12) / D (Întrebarea 15)",
    type: "open_ended",
    question: "Fie un TDA BTree cu constructorii:<br><code>Nil : BTree</code><br><code>Node : Z × BTree × BTree → BTree</code><br>Completați axiomele operatorului care calculează înălțimea unui arbore:<br><br><code>height(Nil) = ...</code><br><code>height(Node(x, l, r)) = ...</code>",
    code: null,
    sampleAnswer: `height(Nil) = 0
height(Node(x, l, r)) = 1 + max(height(l), height(r))`,
    explanation: "• Înălțimea arborelui vid este 0: <code>height(Nil) = 0</code>.<br>• Înălțimea unui nod compus este 1 adunat la maximul dintre înălțimile celor doi subarbori: <code>height(Node(x, l, r)) = 1 + max(height(l), height(r))</code>."
  },
  {
    id: 30,
    category: "Specificare Algebrică & Inducție",
    topic: "Inducție Structurală",
    title: "Cazul de bază pentru size(append(l1, l2)) = size(l1) + size(l2)",
    source: "Parțial - Varianta C (Întrebarea 15) / D (Întrebarea 13)",
    type: "open_ended",
    question: "Scrieți cazul de bază pentru a demonstra prin inducție structurală proprietatea:<br>$$\\text{size}(\\text{append}(l_1, l_2)) = \\text{size}(l_1) + \\text{size}(l_2)$$",
    code: null,
    sampleAnswer: "size(append(Empty, l2)) = size(Empty) + size(l2)",
    explanation: "Cazul de bază pentru primul argument $l_1 = \\text{Empty}$:<br><code>size(append(Empty, l2)) APP1 = size(l2) = 0 + size(l2) APP1 = size(Empty) + size(l2)</code>."
  },

  // ==========================================================
  // GRUPUL 6: Structuri de Date & Operații
  // ==========================================================
  {
    id: 4,
    category: "Structuri de Date",
    topic: "Structuri de Date: Complexități",
    title: "Operații cu cost constant O(1) în ArrayList / LinkedList",
    source: "Parțial - Varianta A (Grila 4) / B (Grila 3)",
    type: "multiple_choice",
    question: "Care din următoarele operații au cost constant $O(1)$?",
    code: null,
    options: [
      "A. acces la poziție arbitrară $k$ în ArrayList",
      "B. inserare la poziție arbitrară $k$ în ArrayList",
      "C. acces la poziție arbitrară $k$ în LinkedList",
      "D. inserare la sfârșit în LinkedList",
      "E. inserare la sfârșit în ArrayList",
      "F. inserare la poziție arbitrară $k$ în LinkedList"
    ],
    correctIndices: [0], // A
    explanation: "Accesul la un index arbitrar $k$ într-un ArrayList se face prin indexare directă în memorie contiguă în timp $O(1)$. Inserarea la o poziție arbitrară în ArrayList/LinkedList necesită deplasare sau parcurgere până la $k$ ($O(n)$). Inserarea la final în ArrayList are cost amortizat $O(1)$, dar cel mai strict $O(1)$ garantat worst-case este accesul direct în ArrayList."
  },
  {
    id: 10,
    category: "Structuri de Date",
    topic: "Structuri de Date: Cost Linear",
    title: "Operații cu cost linear Θ(n) în ArrayList, LinkedList, Ring",
    source: "Parțial - Varianta C (Grila 1) / D (Grila 1)",
    type: "multiple_choice",
    question: "Care dintre următoarele operații au cost linear $\\Theta(n)$ ($n$ fiind numărul de elemente din structură)?",
    code: null,
    options: [
      "A. inserare la sfârșit în ArrayList",
      "B. inserare la sfârșit în LinkedList",
      "C. inserare la sfârșit în Ring"
    ],
    correctIndices: [], // Niciuna
    explanation: "Niciuna dintre opțiuni nu are cost linear $\\Theta(n)$!<br>• Într-un LinkedList (cu pointer la `tail`), inserarea la final este $O(1)$ (sau dacă nu există tail, ar fi fost menționat explicit; în cerințele de examen niciuna nu este marcată ca fiind $\\Theta(n)$).<br>• În Ring (listă circulară cu pointer la ultimul nod) inserarea la sfârșit este $O(1)$.<br>• În ArrayList inserarea la sfârșit are cost amortizat $O(1)$."
  },
  {
    id: 20,
    category: "Structuri de Date",
    topic: "Structuri de Date: ArrayList",
    title: "Număr dublări ArrayList capacitate inițială 4 (20 elemente)",
    source: "Parțial - Varianta A (Întrebarea 11) / B (Întrebarea 10)",
    type: "open_ended",
    question: "Fie un ArrayList care are inițial capacitate 4 și 0 elemente. De câte ori se va dubla când inserăm 20 de elemente?",
    code: null,
    sampleAnswer: "3",
    explanation: "Evoluția capacității la inserarea succesivă:<br>• Elementele 1..4: încap în capacitatea inițială 4.<br>• Elementul 5: se depășește capacitatea 4 $\\to$ prima dublare: capacitate = 8.<br>• Elementele 6..8: încap în capacitatea 8.<br>• Elementul 9: se depășește capacitatea 8 $\\to$ a doua dublare: capacitate = 16.<br>• Elementele 10..16: încap în capacitatea 16.<br>• Elementul 17: se depășește capacitatea 16 $\\to$ a treia dublare: capacitate = 32.<br>• Elementele 18..20: încap în capacitatea 32.<br>În total au avut loc <strong>3</strong> dublări."
  },
  {
    id: 26,
    category: "Structuri de Date",
    topic: "Structuri de Date: ArrayList",
    title: "Număr dublări ArrayList capacitate inițială 1 (40 elemente)",
    source: "Parțial - Varianta C (Întrebarea 11) / D (Întrebarea 14)",
    type: "open_ended",
    question: "Fie un ArrayList cu capacitate 1 și 0 elemente; de câte ori se va dubla când inserăm 40 de elemente?",
    code: null,
    sampleAnswer: "6",
    explanation: "Capacitatea inițială este 1.<br>Dublările au loc la depășirea capacității:<br>1. Inserare element 2: capacitate $1 \\to 2$<br>2. Inserare element 3: capacitate $2 \\to 4$<br>3. Inserare element 5: capacitate $4 \\to 8$<br>4. Inserare element 9: capacitate $8 \\to 16$<br>5. Inserare element 17: capacitate $16 \\to 32$<br>6. Inserare element 33: capacitate $32 \\to 64$<br>Capacitatea 64 acoperă cele 40 de elemente. În total: <strong>6</strong> dublări."
  },
// ==========================================================
  // GRUPUL 7: Întrebări Examen (01-FEB-2026) - Grile & Răspuns Liber
  // ==========================================================
  {
    id: 31,
    category: "Relații de Recurență & Teorema Master",
    topic: "Relații de Recurență din Cod",
    title: "Recurență verificare ordine vector (ordonat crescător)",
    source: "Examen - Varianta A (Grila 1) / B (Grila 2)",
    type: "multiple_choice",
    question: "Ce relație de recurență caracterizează următorul cod ce verifică dacă un vector este sortat?",
    code: `bool f(int *a, int n) {
    if (n == 1) return true;
    if (a[n - 2] > a[n - 1]) return false;
    else return f(a, n - 1);
}`,
    options: [
      "A. $T(n) = T(n - 1) + O(1)$",
      "B. $T(n) = T(n - 1) + O(n)$",
      "C. $T(n) = T(n - 2) + 2T(n - 1) + O(1)$",
      "D. $T(n) = T(n - 2) + T(n - 1) + O(n)$",
      "E. $T(n) = T(n - 2) + T(n - 1) + O(1)$",
      "F. $T(n) = T(n / 2) + O(1)$"
    ],
    correctIndices: [0], // A
    explanation: "La fiecare pas, verificarea condițiilor de bază și a relației $a[n-2] > a[n-1]$ consumă timp constant $O(1)$. Dacă elementele sunt în ordine, se apelează recursiv funcția o singură dată pentru subvectorul de dimensiune $n - 1$: $f(a, n - 1)$. Relația de recurență este $T(n) = T(n - 1) + O(1)$, conducând la un timp de execuție liniar $\\Theta(n)$ în cazul cel mai defavorabil."
  },
  {
    id: 32,
    category: "Analiză Amortizată",
    topic: "Validitatea Costurilor Amortizate",
    title: "Relația dintre suma costurilor amortizate și suma costurilor reale",
    source: "Examen - Varianta A (Grila 2) / B (Grila 6)",
    type: "multiple_choice",
    question: "Care afirmații sunt adevărate privitor la o structură de date $D$, ce pune la dispoziție operațiile $o_1, o_2, \\dots, o_n$?",
    code: null,
    options: [
      "A. Suma costurilor reale este întotdeauna mai mare ca suma costurilor amortizate.",
      "B. Costul real al oricărei operații $o_i$ este mai mare sau egal decât un cost amortizat valid.",
      "C. Costul amortizat valid al oricărei operații $o_i$ este mai mare sau egal decât cel real.",
      "D. Suma costurilor amortizate este întotdeauna mai mare sau egală cu suma costurilor reale."
    ],
    correctIndices: [3], // D
    explanation: "Prin definiția analizei amortizate (metoda contabilă / potențialului), pentru ca analiza să fie validă (să ofere o margine superioară reală a timpului de execuție pe orice secvență de operații), suma costurilor amortizate trebuie să fie întotdeauna mai mare sau egală cu suma costurilor reale: $\\sum_{i=1}^n a_i \\ge \\sum_{i=1}^n c_i$. Costul unei operații individuale amortizate poate fi fie mai mic (când consumă credit), fie mai mare (când economisește credit) decât costul ei real."
  },
  {
    id: 33,
    category: "Specificare Algebrică & Inducție",
    topic: "Specificare Algebrică a TDA List",
    title: "Axiome pentru operația insert în listă sortată descrescător",
    source: "Examen - Varianta A (Grila 3) / B (Grila 4)",
    type: "multiple_choice",
    question: "Alegeți combinația corectă de axiome pentru operația $\\text{insert} : E \\times \\text{List} \\to \\text{List}$ care inserează un element într-o listă sortată (descrescător) păstrând lista sortată: *(Selectați toate opțiunile corecte)*",
    code: null,
    options: [
      "A. $\\text{insert}(x, \\text{Void}) = \\text{Cons}(x, \\text{Void})$",
      "B. $\\text{insert}(x, \\text{Cons}(y, ys)) = \\text{Cons}(y, \\text{Cons}(x, ys));\\ \\text{if } x > y$",
      "C. $\\text{insert}(x, \\text{Cons}(y, ys)) = \\text{Cons}(y, \\text{insert}(x, ys));\\ \\text{if } x < y$",
      "D. $\\text{insert}(x, \\text{Cons}(y, ys)) = \\text{Cons}(x, \\text{Cons}(y, ys));\\ \\text{if } x \\le y$",
      "E. $\\text{insert}(x, \\text{Void}) = \\text{Void}$",
      "F. $\\text{insert}(x, \\text{Cons}(y, ys)) = \\text{Cons}(x, \\text{Cons}(y, ys));\\ \\text{if } x \\ge y$"
    ],
    correctIndices: [0, 2, 5], // A, C, F
    explanation: "Pentru o listă menținută sortată descrescător:<br>1. Inserarea într-o listă vidă produce o listă cu acel unic element: $\\text{insert}(x, \\text{Void}) = \\text{Cons}(x, \\text{Void})$ (A).<br>2. Când lista este nevidă $\\text{Cons}(y, ys)$:<br>• Dacă $x \\ge y$, $x$ este cel puțin egal cu maximul curent $y$, deci se plasează înaintea lui: $\\text{Cons}(x, \\text{Cons}(y, ys))$ (F).<br>• Dacă $x < y$, $y$ rămâne primul element, iar $x$ este inserat recursiv în restul listei: $\\text{Cons}(y, \\text{insert}(x, ys))$ (C)."
  },
  {
    id: 34,
    category: "Arbori AVL & Structuri Balansate",
    topic: "Proprietăți & Echilibrare Arbori AVL",
    title: "Condiții valide pentru un arbore AVL balansat",
    source: "Examen - Varianta A (Grila 4) / B (Grila 1)",
    type: "multiple_choice",
    question: "Care din următoarele sunt condiții valide pentru a descrie faptul că un arbore $\\text{Node}(l, k, r)$ de tip AVL este balansat?",
    code: null,
    options: [
      "A. $|height(l) - height(r)| \\le 1 \\land balanced(l) \\land balanced(r)$",
      "B. Toate frunzele sunt pe același nivel și fiecare nod intern are exact doi copii.",
      "C. $nr\\_noduri(\\text{Node}(l, k, r)) = 2^h - 1$, unde $h$ este înălțimea.",
      "D. $nr\\_noduri(l) = nr\\_noduri(r) \\land balanced(l) \\land balanced(r)$"
    ],
    correctIndices: [0], // A
    explanation: "Un arbore binar de căutare este de tip AVL dacă și numai dacă pentru fiecare nod diferența înălțimilor dintre subarborele stâng și cel drept este cel mult 1 ($|height(l) - height(r)| \\le 1$), iar ambii subarbori $l$ și $r$ sunt la rândul lor arbori AVL balansați ($balanced(l) \\land balanced(r)$). Opțiunea B descrie un arbore binar perfect, iar C un arbore binar plin."
  },
  {
    id: 35,
    category: "Analiza Complexității & Algoritmi",
    topic: "Complexitatea Algoritmilor de Sortare",
    title: "Complexitate worst-case MergeSort și QuickSort",
    source: "Examen - Varianta A (Grila 5) / B (Grila 7)",
    type: "multiple_choice",
    question: "Care este complexitatea, în cazul cel mai defavorabil (worst-case), a algoritmilor MergeSort și QuickSort?",
    code: null,
    options: [
      "A. $\\Theta(n)$ și $\\Theta(n \\log n)$",
      "B. $\\Theta(n^2)$ și $\\Theta(n^2)$",
      "C. $\\Theta(n \\log n)$ și $\\Theta(n^2)$",
      "D. $\\Theta(n \\log n)$ și $\\Theta(n)$",
      "E. $\\Theta(n^2)$ și $\\Theta(n \\log n)$",
      "F. $\\Theta(n \\log n)$ și $\\Theta(n \\log n)$"
    ],
    correctIndices: [2], // C
    explanation: "• MergeSort împarte întotdeauna vectorul în două jumătăți egale, având recurența $T(n) = 2T(n/2) + \\Theta(n) = \\Theta(n \\log n)$ în toate cazurile, inclusiv în cazul cel mai defavorabil.<br>• QuickSort are timpul de execuție mediu $\\Theta(n \\log n)$, dar în cazul cel mai defavorabil (când pivotul împarte vectorul în $0$ și $n - 1$ elemente la fiecare pas) recurența devine $T(n) = T(n - 1) + \\Theta(n)$, ceea ce conduce la $\\Theta(n^2)$."
  },
  {
    id: 36,
    category: "Complexitate Computațională & NP-Completitudine",
    topic: "Reduceri Polinomiale & Clase de Complexitate",
    title: "Deducție clase de complexitate când g ≤_P f și g ≤_P SAT",
    source: "Examen - Varianta A (Grila 6) / B (Grila 8)",
    type: "multiple_choice",
    question: "Știm despre două probleme $f$ și $g$ că $g \\le_P f$ și $g \\le_P \\text{SAT}$. Ce putem spune cu certitudine despre ele?",
    code: null,
    options: [
      "A. $f \\in \\text{NPC}$",
      "B. $f \\in \\text{NP}$",
      "C. $g \\in \\text{P}$",
      "D. $g \\in \\text{NPC}$",
      "E. $g \\in \\text{NP}$",
      "F. $f \\in \\text{P}$"
    ],
    correctIndices: [4], // E
    explanation: "Problema SAT este în clasa $\\text{NP}$ (și este $\\text{NP}$-completă conform Teoremei Cook-Levin). Din proprietatea reducerilor polinomiale: dacă o problemă $g$ se reduce polinomial la o problemă din $\\text{NP}$ ($g \\le_P \\text{SAT}$), atunci $g$ aparține de asemenea clasei $\\text{NP}$ ($g \\in \\text{NP}$). Din faptul că $g \\le_P f$, nu putem deduce nimic cert despre clasa de complexitate a lui $f$ (problema $f$ poate fi în afara $\\text{NP}$, de exemplu $\\text{PSPACE}$ sau $\\text{EXPTIME}$)."
  },
  {
    id: 37,
    category: "Analiza Complexității & Algoritmi",
    topic: "Analiza Buclelor Imbricate",
    title: "Complexitate bucle for imbricate cu i *= 2 și j < i",
    source: "Examen - Varianta A (Grila 7) / B (Grila 3)",
    type: "multiple_choice",
    question: "Următorul cod calculează și printează o valoare pentru count în funcție de $n$. Care este complexitatea funcției computate?",
    code: `void solve(int n) {
    int count = 0;
    for (int i = 1; i <= n; i *= 2)
        for (int j = 0; j < i; j++)
            count++;
    printf("Operations:%d\\n", count);
}`,
    options: [
      "A. $O(\\log n)$",
      "B. $O(2^n)$",
      "C. $O(n \\log n)$",
      "D. $O(n^2)$",
      "E. $O(\\sqrt{n})$",
      "F. $O(n)$"
    ],
    correctIndices: [5], // F
    explanation: "Variabila $i$ ia valorile $1, 2, 4, 8, \\dots, 2^k$ atâta timp cât $i \\le n$. Pentru fiecare astfel de valoare a lui $i$, bucla interioară după $j$ se execută de exact $i$ ori. Numărul total de iterații este suma seriei geometrice: $1 + 2 + 4 + 8 + \\dots + 2^{\\lfloor \\log_2 n \\rfloor} = 2^{\\lfloor \\log_2 n \\rfloor + 1} - 1 < 2n$. Prin urmare, numărul total de operații este în $O(n)$ (și $\\Theta(n)$)."
  },
  {
    id: 38,
    category: "Complexitate Computațională & NP-Completitudine",
    topic: "Formă Normală Conjunctivă (CNF)",
    title: "Identificare formule în Formă Normală Conjunctivă (CNF) - Set 1",
    source: "Examen - Varianta A (Grila 8) / B (Grila 5)",
    type: "multiple_choice",
    question: "Care din următoarele formule sunt în formă normală conjunctivă (CNF)? *(Selectați toate opțiunile valide)*",
    code: null,
    options: [
      "A. $(a \\lor b) \\land (c \\land d)$",
      "B. $a \\lor b \\lor c$",
      "C. $(\\bar{a} \\lor b \\lor \\bar{c}) \\land (\\bar{c} \\lor d)$",
      "D. $(a \\lor b \\lor c) \\land (c \\land d)$",
      "E. $\\overline{(a \\lor b)} \\land \\overline{(c \\lor d)} \\land (a \\lor c)$",
      "F. $a \\land b \\land c$"
    ],
    correctIndices: [1, 2, 5], // B, C, F
    explanation: "O formulă este în Formă Normală Conjunctivă (CNF) dacă este o conjuncție ($\\land$) de una sau mai multe clauze, unde fiecare clauză este o disjuncție ($\\lor$) de literali (o variabilă sau negarea unei variabile):<br>• B ($a \\lor b \\lor c$): o singură clauză disjunctivă reprezintă o formulă validă în CNF.<br>• C ($(\\bar{a} \\lor b \\lor \\bar{c}) \\land (\\bar{c} \\lor d)$): conjuncție de două clauze formate din literali $\\implies$ CNF.<br>• F ($a \\land b \\land c$): conjuncție de 3 clauze unitare $\\implies$ CNF.<br>• A și D conțin operatorul $\\land$ în interiorul unei clauze/paranteze ($(c \\land d)$).<br>• E conține bara de negație extinsă peste întreaga expresie $\\overline{(a \\lor b)}$, ceea ce este interzis în CNF (negațiile pot apărea doar nemijlocit pe literali individuali)."
  },
  {
    id: 39,
    category: "Analiza Complexității & Algoritmi",
    topic: "Divide et Impera Neuniform",
    title: "Complexitate MergeSort cu divizare alternativă (jumătate și 1/10, 9/10)",
    source: "Examen - Varianta A (Întrebarea 9) / B (Întrebarea 12)",
    type: "open_ended",
    question: "Considerăm un algoritm de sortare de tip divide et impera care funcționează conceptual similar cu MergeSort, dar în care împărțirea vectorului se face, alternativ: la jumătate, apoi în raport 1/10, 9/10, apoi din nou la jumătate, etc. Ce complexitate are algoritmul? Argumentați răspunsul.",
    code: null,
    sampleAnswer: `Fie $T_1(n)$ recurența care descrie algoritmul de sortare indicat în problemă. Definim două recurențe de referință:
1. Împărțire simetrică la jumătate la fiecare pas:
$$T_2(n) = 2T_2(n/2) + \\Theta(n) \\implies T_2(n) \\in \\Theta(n \\log n)$$
2. Împărțire asimetrică 1/10 și 9/10 la fiecare pas:
$$T_3(n) = T_3(n/10) + T_3(9n/10) + \\Theta(n) \\implies T_3(n) \\in \\Theta(n \\log n)$$

Din descrierea algoritmului rezultă că execuția este mărginită inferior și superior de cele două recurențe:
$$T_2(n) \\le T_1(n) \\le T_3(n)$$
Cum ambele funcții margine $T_2(n)$ și $T_3(n)$ sunt în $\\Theta(n \\log n)$, prin teorema cleștelui rezultă:
$$T_1(n) \\in \\Theta(n \\log n)$$`,
    explanation: "Algoritmul alternează între împărțiri echilibrate ($n/2$) și împărțiri dezechilibrate ($n/10, 9n/10$). Pe fiecare nivel al arborelui de recursivitate, interclasarea tuturor subproblemelor necesită timp liniar $\\Theta(n)$. Lungimea celui mai scurt drum până la o frunză este $\\approx \\log_2 n$, iar a celui mai lung este $\\approx \\log_{10/9} n$, ambele fiind $\\Theta(\\log n)$. Numărul de nivele fiind $\\Theta(\\log n)$ și costul pe fiecare nivel fiind $\\Theta(n)$, complexitatea globală este $\\Theta(n \\log n)$."
  },
  {
    id: 40,
    category: "Structuri de Date",
    topic: "Alegerea Structurilor de Date Optime",
    title: "Structură de date pentru editare imagini cu O(1) navigare și inserare",
    source: "Examen - Varianta A (Întrebarea 10) / B (Întrebarea 13)",
    type: "open_ended",
    question: "Să presupunem că implementăm o aplicație de editare imagini în care stocăm un număr $n$ de stări reprezentând etape ale editării. Trebuie să navigăm cu un cost $O(1)$ între oricare două stări succesive (undo / redo). De asemenea, trebuie să putem introduce cu un cost $O(1)$ o nouă stare între oricare două stări succesive. Ce implementare din cele prezentate la curs s-ar potrivi cel mai bine? Argumentați răspunsul.",
    code: null,
    sampleAnswer: `Structura de date potrivită este inelul (Ring / Zipper) implementat folosind două stive.
• Operația de inserare a unei noi stări se realizează în timp $O(1)$ prin push pe stiva activă.
• Navigarea înainte / înapoi între stări se realizează prin mutarea elementelor între cele două stive (pop de pe o stivă și push pe cealaltă), având un cost amortizat constant $O(1)$.

O alternativă validă este lista dublu înlănțuită (Doubly Linked List):
• Permite deplasarea înainte/înapoi de la nodul curent în $O(1)$ prin pointerii next și prev.
• Permite inserarea unui nou nod adiacent nodului curent în timp $O(1)$ prin reajustarea pointerilor locali.
(Mențiune: lista simplu înlănțuită nu permite navigarea facilă înapoi în timp constant).`,
    explanation: "Implementarea cu două stive (asemănătoare mecanismului de Undo/Redo din editoare) păstrează istoricul trecut pe o stivă și istoricul viitor pe cealaltă. Transferul elementelor are cost amortizat $O(1)$. O listă dublu înlănțuită cu cursor pe nodul curent atinge de asemenea $O(1)$ worst-case atât pentru mutarea cursorului la vecini, cât și pentru inserarea unui nod la poziția curentă."
  },
  {
    id: 41,
    category: "Specificare Algebrică & Inducție",
    topic: "Axiome Operatori TDA List",
    title: "Axiome pentru operatorul replicate(n, list)",
    source: "Examen - Varianta A (Întrebarea 11) / B (Întrebarea 10)",
    type: "open_ended",
    question: "Scrieți axiome pentru un operator $\\text{replicate} : \\mathbb{N} \\times \\text{List} \\to \\text{List}$ care primește un număr $n$ și o listă, și repetă fiecare element de $n$ ori (ex: $\\text{replicate}(3, [4, 8, 11]) = [4, 4, 4, 8, 8, 8, 11, 11, 11]$). Dacă $n \\le 0$, rezultatul este lista vidă.",
    code: null,
    sampleAnswer: `Axiomele se definesc folosind un operator auxiliar $\\text{repeat} : \\mathbb{N} \\times E \\to \\text{List}$:

1. Pentru operatorul auxiliar $\\text{repeat}$:
$$\\text{repeat}(0, x) = \\text{Void}$$
$$\\text{repeat}(n, x) = \\text{Cons}(x, \\text{repeat}(n - 1, x)) \\quad \\text{pentru } n > 0$$

2. Pentru operatorul principal $\\text{replicate}$:
$$\\text{replicate}(n, \\text{Void}) = \\text{Void}$$
$$\\text{replicate}(n, \\text{Cons}(x, xs)) = \\text{append}(\\text{repeat}(n, x), \\text{replicate}(n, xs))$$`,
    explanation: "Operatorul replicate se bazează pe recursivitate structurală: dacă lista e vidă, rezultatul e vid. Pentru o listă cu cap $x$ și coadă $xs$, construim mai întâi secvența de $n$ copii ale lui $x$ prin operatorul auxiliar `repeat(n, x)`, apoi o concatenăm la începutul rezultatului apelului recursiv pe coada `replicate(n, xs)`."
  },
  {
    id: 42,
    category: "Complexitate Computațională & NP-Completitudine",
    topic: "Transformare SAT la CNF-SAT",
    title: "Reducere SAT ≤_P CNF-SAT pentru (x ∧ (y ∨ z)) ∨ (x ∧ z)",
    source: "Examen - Varianta A (Întrebarea 12) / B (Întrebarea 11)",
    type: "open_ended",
    question: "Aplicând transformarea studiată la curs SAT $\\le_P$ CNF-SAT, care este formula finală obținută pentru:\n$$(x \\land (y \\lor z)) \\lor (x \\land z)$$?",
    code: null,
    sampleAnswer: `Formula finală în CNF obținută prin transformarea Tseytin este:
$$(x \\lor A_2) \\land (y \\lor A_1 \\lor A_2) \\land (z \\lor A_1 \\lor A_2) \\land (x \\lor A_3) \\land (z \\lor A_3)$$`,
    explanation: "Transformarea Tseytin (folosită pentru reducerea SAT $\\le_P$ CNF-SAT) introduce variabile proaspete pentru fiecare subexpresie / poartă logică din arborele formulei booleene ($A_1$ pentru disjuncția interioară $y \\lor z$, $A_2$ pentru conjuncția stângă $x \\land (y \\lor z)$, $A_3$ pentru conjuncția dreaptă $x \\land z$), garantând transformarea în timp polinomial fără creșterea exponențială cauzată de distributivitate."
  },
  {
    id: 43,
    category: "Arbori AVL & Structuri Balansate",
    topic: "Rotații de Rebalansare AVL",
    title: "Structură dezechilibrată și operația rotate left-right",
    source: "Examen - Varianta A (Întrebarea 13) / B (Întrebarea 9)",
    type: "open_ended",
    question: "Desenați sau descrieți un arbore a cărui structură declanșează operația rotate left-right. Indicați nodul unde se produce rotația și rezultatul acesteia.",
    code: null,
    sampleAnswer: `1. Structura inițială care declanșează rotate left-right (cazul Left-Right):
• Nodul rădăcină $Z$ are factor de echilibru $+2$ (subarborele stâng este mai înalt cu 2).
• Copilul stâng al lui $Z$, notat $X$, are factor de echilibru $-1$ (subarborele său drept este mai înalt).
• Structură minimală:
       Z (+2)
      /
     X (-1)
      \\
       Y

2. Desfășurarea operației (rotație dublă):
• Pasul 1: Rotație simplă la stânga în nodul $X$ (copilul stâng). Nodul $Y$ urcă în locul lui $X$, iar $X$ devine fiul stâng al lui $Y$. Arborele devine de tip Left-Left:
       Z (+2)
      /
     Y (+1)
    /
   X
• Pasul 2: Rotație simplă la dreapta în nodul rădăcină $Z$.

3. Rezultatul final (arbore rebalansat):
       Y (0)
      / \\
     X   Z
Nodul $Y$ devine noua rădăcină a subarborelui, având pe $X$ ca fiu stâng și pe $Z$ ca fiu drept. Factorii de echilibru devin $0$.`,
    explanation: "Dezechilibrul Left-Right apare atunci când inserarea s-a produs în subarborele drept al fiului stâng. O singură rotație la dreapta nu ar rezolva dezechilibrul; este necesară transformarea mai întâi într-o formă liniară Left-Left printr-o rotație la stânga a fiului stâng, urmată de rotația la dreapta a rădăcinii."
  },
  {
    id: 44,
    category: "Complexitate Computațională & NP-Completitudine",
    topic: "Reduceri Polinomiale & Clase de Complexitate",
    title: "Deducție clase de complexitate când f ≤_P g și g ≤_P SAT",
    source: "Examen - Varianta C (Grila 1) / D (Grila 6)",
    type: "multiple_choice",
    question: "Știm despre două probleme $f$ și $g$ că $f \\le_P g$ și $g \\le_P \\text{SAT}$. Ce putem spune despre ele? *(Selectați toate afirmațiile adevărate)*",
    code: null,
    options: [
      "A. $f \\in \\text{P}$",
      "B. $g \\in \\text{P}$",
      "C. $f \\in \\text{NP}$",
      "D. $g \\in \\text{NP}$",
      "E. $f \\in \\text{NPC}$",
      "F. $g \\in \\text{NPC}$"
    ],
    correctIndices: [2, 3], // C, D
    explanation: "Problema SAT este în $\\text{NP}$ (mai precis este problema standard $\\text{NP}$-completă).<br>1. Din $g \\le_P \\text{SAT}$ și $\\text{SAT} \\in \\text{NP}$, rezultă imediat că $g \\in \\text{NP}$.<br>2. Din tranzitivitatea reducerilor polinomiale, $f \\le_P g$ și $g \\le_P \\text{SAT} \\implies f \\le_P \\text{SAT}$, ceea ce garantează că și $f \\in \\text{NP}$.<br>Niciuna dintre ele nu este garantat în $\\text{P}$ sau $\\text{NPC}$ (ar fi necesară o reducere inversă sau demonstrarea apartenenței la $\\text{P}$)."
  },
  {
    id: 45,
    category: "Arbori AVL & Structuri Balansate",
    topic: "Proprietăți & Echilibrare Arbori AVL",
    title: "Proprietatea fundamentală a factorului de echilibru într-un arbore AVL",
    source: "Examen - Varianta C (Grila 2) / D (Grila 3)",
    type: "multiple_choice",
    question: "Care dintre următoarele afirmații descrie corect o proprietate fundamentală a unui arbore AVL valid?",
    code: null,
    options: [
      "A. Toate nodurile frunză dintr-un arbore AVL trebuie să se afle la același nivel sau la o diferență de maximum un nivel față de rădăcină.",
      "B. Un arbore AVL este balansat doar dacă subarborele stâng și cel drept al rădăcinii au același număr de noduri.",
      "C. Pentru fiecare nod, înălțimea subarborelui stâng minus cea a celui drept trebuie să fie în mulțimea $\\{-1, 0, 1\\}$.",
      "D. Orice arbore AVL cu $n$ noduri are o înălțime de exact $\\lfloor \\log_2 n \\rfloor$."
    ],
    correctIndices: [2], // C
    explanation: "Definiția canonică a structurii de arbore AVL impune condiția de echilibru pe înălțime (balance factor): pentru fiecare nod intern sau rădăcină, diferența $height(left) - height(right)$ este fie $-1$, $0$, fie $1$. Această proprietate garantează că înălțimea arborelui nu depășește niciodată $\\approx 1.44 \\log_2 n$, asigurând căutare, inserare și ștergere în timp $O(\\log n)$."
  },
  {
    id: 46,
    category: "Analiza Complexității & Algoritmi",
    topic: "Complexitatea Algoritmilor de Sortare",
    title: "Complexitate worst-case InsertionSort și QuickSort",
    source: "Examen - Varianta C (Grila 3) / D (Grila 5)",
    type: "multiple_choice",
    question: "Care este complexitatea, în cazul cel mai defavorabil (worst-case), a algoritmilor InsertionSort și QuickSort?",
    code: null,
    options: [
      "A. $\\Theta(n)$ și $\\Theta(n \\log n)$",
      "B. $\\Theta(n^2)$ și $\\Theta(n^2)$",
      "C. $\\Theta(n \\log n)$ și $\\Theta(n^2)$",
      "D. $\\Theta(n \\log n)$ și $\\Theta(n \\log n)$",
      "E. $\\Theta(n \\log n)$ și $\\Theta(n)$",
      "F. $\\Theta(n^2)$ și $\\Theta(n \\log n)$"
    ],
    correctIndices: [1], // B
    explanation: "• InsertionSort în cel mai defavorabil caz (vector sortat în ordine inversă) efectuează $\\sum_{i=1}^{n-1} i = \\frac{n(n-1)}{2} = \\Theta(n^2)$ deplasări și comparații.<br>• QuickSort în cel mai defavorabil caz (de exemplu când pivotul este cel mai mic sau cel mai mare element la fiecare pas) generează subprobleme de dimensiuni $0$ și $n - 1$, ducând la recurența $T(n) = T(n - 1) + \\Theta(n) = \\Theta(n^2)$."
  },
  {
    id: 47,
    category: "Complexitate Computațională & NP-Completitudine",
    topic: "Formă Normală Conjunctivă (CNF)",
    title: "Identificare formule în Formă Normală Conjunctivă (CNF) - Set 2",
    source: "Examen - Varianta C (Grila 4) / D (Grila 7)",
    type: "multiple_choice",
    question: "Care din următoarele formule sunt în formă normală conjunctivă (CNF)? *(Selectați toate opțiunile valide)*",
    code: null,
    options: [
      "A. $\\overline{(x_1 \\lor x_2)} \\land \\overline{(x_1 \\lor x_3)}$",
      "B. $(\\bar{x}_1 \\lor \\bar{x}_2 \\lor x_3) \\land (x_1 \\lor x_3)$",
      "C. $(x_1 \\land x_2) \\land (x_3 \\lor x_4)$",
      "D. $(x_1 \\lor x_2) \\land x_3$",
      "E. $x_1 \\land x_2$",
      "F. $(x_1 \\lor x_2) \\land (x_1 \\land x_3)$"
    ],
    correctIndices: [1, 3, 4], // B, D, E
    explanation: "În CNF, formula trebuie să fie o conjuncție de clauze, unde fiecare clauză este o disjuncție de literali:<br>• B ($(\\bar{x}_1 \\lor \\bar{x}_2 \\lor x_3) \\land (x_1 \\lor x_3)$): două clauze disjunctive legate prin $\\land$ $\\implies$ CNF valid.<br>• D ($(x_1 \\lor x_2) \\land x_3$): conjuncție între o clauză binară și o clauză unitară ($x_3$) $\\implies$ CNF valid.<br>• E ($x_1 \\land x_2$): conjuncție de două clauze unitare $\\implies$ CNF valid.<br>• A conține negații extinse peste disjuncții întregi ($\\overline{x_1 \\lor x_2}$), ceea ce încalcă definiția CNF.<br>• C și F conțin operatori $\\land$ în interiorul termenilor."
  },
  {
    id: 48,
    category: "Specificare Algebrică & Inducție",
    topic: "Specificare Algebrică a TDA List",
    title: "Axiome pentru operația removeFirst pe TDA List",
    source: "Examen - Varianta C (Grila 5) / D (Grila 1)",
    type: "multiple_choice",
    question: "Alegeți combinația corectă de axiome pentru operația $\\text{removeFirst} : E \\times \\text{List} \\to \\text{List}$ care șterge prima apariție a unui element dintr-o listă: *(Selectați toate opțiunile corecte)*",
    code: null,
    options: [
      "A. $\\text{removeFirst}(x, \\text{Cons}(y, ys)) = \\text{Cons}(y, \\text{removeFirst}(x, ys));\\ \\text{if } x \\neq y$",
      "B. $\\text{removeFirst}(x, \\text{Cons}(y, ys)) = \\text{Cons}(y, ys);\\ \\text{if } x \\neq y$",
      "C. $\\text{removeFirst}(x, \\text{Cons}(y, ys)) = ys;\\ \\text{if } x = y$",
      "D. $\\text{removeFirst}(x, \\text{Cons}(y, ys)) = \\text{removeFirst}(x, ys);\\ \\text{if } x \\neq y$",
      "E. $\\text{removeFirst}(x, \\text{Void}) = \\text{Void}$",
      "F. $\\text{removeFirst}(x, \\text{Cons}(y, ys)) = \\text{removeFirst}(x, ys);\\ \\text{if } x = y$"
    ],
    correctIndices: [0, 2, 4], // A, C, E
    explanation: "Axiomele specificării algebrice pentru `removeFirst` sunt:<br>1. $\\text{removeFirst}(x, \\text{Void}) = \\text{Void}$ (E): ștergerea dintr-o listă vidă întoarce tot lista vidă.<br>2. Când capul listei este chiar elementul căutat ($x = y$): $\\text{removeFirst}(x, \\text{Cons}(y, ys)) = ys$ (C). Observați că NU se mai apelează recursiv pe $ys$, deoarece eliminăm doar PRIMA apariție a lui $x$!<br>3. Când capul listei diferă de elementul căutat ($x \\neq y$): $\\text{removeFirst}(x, \\text{Cons}(y, ys)) = \\text{Cons}(y, \\text{removeFirst}(x, ys))$ (A), păstrând $y$ și apelând recursiv pe restul listei."
  },
  {
    id: 49,
    category: "Analiză Amortizată",
    topic: "Validitatea Costurilor Amortizate",
    title: "Condiția de validitate a analizei amortizate pe prefixe de operații",
    source: "Examen - Varianta C (Grila 6) / D (Grila 2)",
    type: "multiple_choice",
    question: "Fie o secvență de $m$ operații efectuate asupra unei structuri de date. Dacă notăm cu $c_i$ costul real al operației $i$, și cu $a_i$ costul său amortizat, care dintre următoarele condiții garantează că analiza amortizată este validă (nu subestimează efortul total)?",
    code: null,
    options: [
      "A. Pentru orice operație individuală $k$, trebuie să avem $a_k \\ge c_k$.",
      "B. Costul amortizat $a_i$ trebuie să fie media aritmetică simplă a tuturor costurilor reale $c_i$ posibile.",
      "C. Suma costurilor reale trebuie să fie întotdeauna strict mai mare decât suma costurilor amortizate pentru a justifica utilizarea structurii.",
      "D. Suma costurilor amortizate pentru orice prefix al secvenței de operații trebuie să fie mai mare sau egală cu suma costurilor reale corespunzătoare: $\\sum_{i=1}^k a_i \\ge \\sum_{i=1}^k c_i$."
    ],
    correctIndices: [3], // D
    explanation: "Pentru ca analiza amortizată să fie validă la orice pas al execuției, suma costurilor amortizate pe orice prefix de lungime $k$ ($1 \\le k \\le m$) trebuie să majoreze suma costurilor reale: $\\sum_{i=1}^k a_i \\ge \\sum_{i=1}^k c_i$. În metoda potențialului, această condiție se traduce prin $a_i = c_i + \\Phi(D_i) - \\Phi(D_{i-1})$, iar suma prefix devine $\\sum_{i=1}^k a_i = \\sum_{i=1}^k c_i + \\Phi(D_k) - \\Phi(D_0) \\ge \\sum_{i=1}^k c_i$ dacă și numai dacă $\\Phi(D_k) \\ge \\Phi(D_0)$ pentru orice $k$."
  },
  {
    id: 50,
    category: "Relații de Recurență & Teorema Master",
    topic: "Complexitatea Algoritmilor Recursivi",
    title: "Complexitate apel recursiv dublu f(n-1) + f(n-1)",
    source: "Examen - Varianta C (Grila 7) / D (Grila 4)",
    type: "multiple_choice",
    question: "Care este complexitatea următorului fragment de cod recursiv?",
    code: `void f(int n) {
    if (n <= 0) return;
    return f(n - 1) + f(n - 1);
}`,
    options: [
      "A. $O(2^n)$",
      "B. $O(n^2)$",
      "C. $O(n \\log n)$",
      "D. $O(\\log n)$",
      "E. $O(n)$",
      "F. $O(\\sqrt{n})$"
    ],
    correctIndices: [0], // A
    explanation: "Funcția execută două apeluri recursive pe argumentul $n - 1$, iar munca suplimentară este $O(1)$. Relația de recurență este $T(n) = 2T(n - 1) + O(1)$. Arborele de apeluri este un arbore binar plin de înălțime $n$, având $\\sum_{i=0}^n 2^i = 2^{n+1} - 1 = \\Theta(2^n)$ noduri. Prin urmare, complexitatea este $O(2^n)$."
  },
  {
    id: 51,
    category: "Relații de Recurență & Teorema Master",
    topic: "Relații de Recurență din Cod",
    title: "Recurență cod cu multiplicare scalară 2 * f(a, n - 1)",
    source: "Examen - Varianta C (Grila 8) / D (Grila 8)",
    type: "multiple_choice",
    question: "Ce relație de recurență caracterizează următorul cod?",
    code: `int f(int *a, int n) {
    if (n == 1) return 1;
    if (a[n - 2] > a[n - 1]) return -1;
    else return 2 * f(a, n - 1);
}`,
    options: [
      "A. $T(n) = T(n - 1) + O(1)$",
      "B. $T(n) = 2T(n - 1) + O(1)$",
      "C. $T(n) = T(n - 1) + O(n)$",
      "D. $T(n) = T(n - 2) + T(n - 1) + O(1)$",
      "E. $T(n) = 2T(n / 2) + O(1)$",
      "F. $T(n) = T(n - 2) + 2T(n - 1) + O(1)$"
    ],
    correctIndices: [0], // A
    explanation: "Atenție la capcana multiplicării `2 * f(...)`: deși rezultatul returnat este multiplicat cu 2, se realizează un SINGUR apel recursiv, `f(a, n - 1)`. Întrucât operațiile locale din cadrul funcției (comparații, verificări, înmulțire scalară) au cost $O(1)$, numărul de pași executat pentru o intrare de dimensiune $n$ satisface $T(n) = T(n - 1) + O(1)$, generând un lanț de apeluri liniare cu complexitatea $\\Theta(n)$."
  },
  {
    id: 52,
    category: "Analiza Complexității & Algoritmi",
    topic: "Divide et Impera Neuniform",
    title: "Complexitate MergeSort cu divizare aleatoare (par: 1/2, impar: 1/10 și 9/10)",
    source: "Examen - Varianta C (Întrebarea 9) / D (Întrebarea 11)",
    type: "open_ended",
    question: "Considerăm un algoritm de sortare de tip divide et impera care funcționează conceptual similar cu MergeSort, dar în care împărțirea vectorului se face după următoarea strategie: se generează un număr aleator; dacă numărul este par, atunci vectorul este împărțit la jumătate; dacă numărul este impar, vectorul este împărțit în raport 1/10 și 9/10. Ce complexitate are algoritmul? Argumentați răspunsul.",
    code: null,
    sampleAnswer: `Fie $T_1(n)$ recurența care descrie algoritmul de sortare indicat în problemă.
Definim două recurențe extreme:
1. În cel mai bun caz (toate împărțirile sunt simetrice, par):
$$T_2(n) = 2T_2(n/2) + \\Theta(n) \\implies T_2(n) \\in \\Theta(n \\log n)$$
2. În cel mai defavorabil caz (toate împărțirile sunt asimetrice, impar):
$$T_3(n) = T_3(n/10) + T_3(9n/10) + \\Theta(n) \\implies T_3(n) \\in \\Theta(n \\log n)$$

Oricare ar fi secvența de numere aleatoare generate, timpul real $T_1(n)$ este mărginit între cele două recurențe:
$$T_2(n) \\le T_1(n) \\le T_3(n)$$
Cum atât $T_2(n)$, cât și $T_3(n)$ au complexitatea $\\Theta(n \\log n)$, rezultă conform teoremei cleștelui că:
$$T_1(n) \\in \\Theta(n \\log n)$$`,
    explanation: "Chiar dacă împărțirea este dezechilibrată (1/10 și 9/10), la fiecare nivel al arborelui de recursivitate suma dimensiunilor subproblemelor este cel mult $n$, efortul de interclasare rămânând $\\Theta(n)$. Lungimea maximă a unei căi în arbore este $\\log_{10/9} n = \\Theta(\\log n)$. Deoarece ambele margini (atât cea mai favorabilă cât și cea mai defavorabilă) au ordinul $n \\log n$, orice comportament intermediar sau probabilistic rămâne ferm în clasa $\\Theta(n \\log n)$."
  },
  {
    id: 53,
    category: "Arbori AVL & Structuri Balansate",
    topic: "Rotații de Rebalansare AVL",
    title: "Structură dezechilibrată și operația rotate right-left",
    source: "Examen - Varianta C (Întrebarea 10) / D (Întrebarea 9)",
    type: "open_ended",
    question: "Desenați sau descrieți un arbore a cărui structură declanșează operația rotate right-left. Indicați nodul unde se produce rotația și rezultatul acesteia.",
    code: null,
    sampleAnswer: `1. Structura inițială care declanșează rotate right-left (cazul Right-Left):
• Nodul rădăcină $Z$ are factor de echilibru $-2$ (subarborele drept este mai înalt cu 2 decât cel stâng).
• Copilul drept al lui $Z$, notat $X$, are factor de echilibru $+1$ (subarborele său stâng este mai înalt).
• Structură minimală:
     Z (-2)
      \\
       X (+1)
      /
     Y

2. Desfășurarea operației (rotație dublă):
• Pasul 1: Rotație simplă la dreapta în nodul $X$ (copilul drept). Nodul $Y$ urcă în locul lui $X$, iar $X$ devine fiul drept al lui $Y$. Arborele devine de tip Right-Right:
     Z (-2)
      \\
       Y (-1)
        \\
         X
• Pasul 2: Rotație simplă la stânga în nodul rădăcină $Z$.

3. Rezultatul final (arbore rebalansat):
       Y (0)
      / \\
     Z   X
Nodul $Y$ devine noua rădăcină, având pe $Z$ ca fiu stâng și pe $X$ ca fiu drept. Factorii de echilibru devin $0$.`,
    explanation: "Rotația Right-Left este operația simetrică rotației Left-Right. Ea se activează atunci când noul nod cauzator de dezechilibru se află în subarborele stâng al fiului drept al nodului critic $Z$. Prima rotație simplă la dreapta aliniază dezechilibrul pe o singură direcție (Right-Right), permițând celei de-a doua rotații simple la stânga să restabilească proprietatea AVL."
  },
  {
    id: 54,
    category: "Structuri de Date",
    topic: "Alegerea Structurilor de Date Optime",
    title: "Structură de date pentru playlist audio cu O(1) navigare și inserare",
    source: "Examen - Varianta C (Întrebarea 11) / D (Întrebarea 10)",
    type: "open_ended",
    question: "Să presupunem că implementăm un player de muzică digital care gestionează un playlist activ de $n$ melodii. Aplicația trebuie să permită utilizatorului să treacă la melodia următoare sau la cea precedentă cu un cost de $O(1)$. De asemenea, utilizatorul trebuie să poată insera o melodie nouă (de exemplu, folosind funcția “Add to Queue” sau “Play Next”) oriunde în interiorul listei curente, tot cu un cost de $O(1)$. Ce implementare din cele prezentate la curs s-ar potrivi cel mai bine pentru acest playlist? Argumentați răspunsul.",
    code: null,
    sampleAnswer: `Structura de date potrivită este inelul (Ring) implementat folosind două stive:
• Operația de inserare a unei melodii noi la poziția curentă se realizează în timp $O(1)$ prin adăugare directă pe una dintre stive.
• Operația de navigare înainte / înapoi între melodii se realizează în timp amortizat constant $O(1)$ prin mutarea pieselor între cele două stive.

O alternativă validă foarte des utilizată este o Listă Dublu Înlanțuită Circulară (Doubly Linked List):
• Permite deplasarea la melodia următoare sau anterioară în $O(1)$ (current = current-&gt;next sau current = current-&gt;prev).
• Permite inserarea unei piese noi adiacent cursorului în timp $O(1)$ prin actualizarea a 4 pointeri locali.`,
    explanation: "Structura Ring cu două stive împarte playlist-ul în două jumătăți cu centrul în melodia curentă, permițând navigare bidirecțională amortizată în $O(1)$ și inserare în $O(1)$. Lista dublu înlănțuită rezolvă de asemenea problema garantând chiar $O(1)$ worst-case dacă se păstrează un pointer la elementul curent."
  },
  {
    id: 55,
    category: "Specificare Algebrică & Inducție",
    topic: "Axiome Operatori TDA List",
    title: "Axiome pentru operatorul replicate(list) - repetă fiecare element de e ori",
    source: "Examen - Varianta C (Întrebarea 12) / D (Întrebarea 13)",
    type: "open_ended",
    question: "Scrieți axiome pentru un operator $\\text{replicate} : \\text{List} \\to \\text{List}$ care primește o listă și repetă fiecare element $e$ de $e$ ori (de exemplu: $\\text{replicate}([4, 2, 5]) = [4, 4, 4, 4, 2, 2, 5, 5, 5, 5, 5]$).",
    code: null,
    sampleAnswer: `Axiomele se definesc folosind operatorul auxiliar $\\text{repeat} : \\mathbb{N} \\times E \\to \\text{List}$:

1. Pentru operatorul auxiliar $\\text{repeat}$:
$$\\text{repeat}(0, x) = \\text{Void}$$
$$\\text{repeat}(n, x) = \\text{Cons}(x, \\text{repeat}(n - 1, x)) \\quad \\text{pentru } n > 0$$

2. Pentru operatorul principal $\\text{replicate}$:
$$\\text{replicate}(\\text{Void}) = \\text{Void}$$
$$\\text{replicate}(\\text{Cons}(x, xs)) = \\text{append}(\\text{repeat}(x, x), \\text{replicate}(xs))$$`,
    explanation: "Spre deosebire de varianta cu parametrul $n$ fix, aici multiplicatorul fiecărui element $x$ este însăși valoarea elementului $x$. Funcția auxiliară $\\text{repeat}(x, x)$ produce o listă de lungime $x$ ce conține elementul $x$, care se atașează la rezultatul apelului recursiv $\\text{replicate}(xs)$."
  },
  {
    id: 56,
    category: "Complexitate Computațională & NP-Completitudine",
    topic: "Transformare SAT la CNF-SAT",
    title: "Reducere SAT ≤_P CNF-SAT cu clauze compuse extinse",
    source: "Examen - Varianta C (Întrebarea 13) / D (Întrebarea 12)",
    type: "open_ended",
    question: "Aplicând transformarea studiată la curs SAT $\\le_P$ CNF-SAT, care este formula finală obținută pentru:\n$$(x \\land (y \\lor z)) \\lor (x \\land z)$$?",
    code: null,
    sampleAnswer: `Formula finală în CNF obținută prin transformarea Tseytin este:
$$(x \\lor A_2 \\lor A_3) \\land (y \\lor A_1 \\lor A_2 \\lor A_3) \\land (z \\lor A_1 \\lor A_2 \\lor A_3) \\land (x \\lor A_3) \\land (z \\lor A_3)$$`,
    explanation: "În varianta canonică studiată la curs pentru variantele C/D, etichetele clauzelor superioare din arbore ($A_2, A_3$) sunt propagate în clauzele disjunctive rezultate din subexpresii, asigurând echisatisfiabilitatea între formula generală SAT inițială și formula CNF de ieșire."
  }
];
