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
    source: "Varianta A (Grila 1) / B (Grila 4)",
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
    source: "Varianta A (Grila 7) / B (Grila 7)",
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
    source: "Varianta C (Grila 3) / D (Grila 3)",
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
    source: "Varianta C (Grila 9) / D (Grila 9)",
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
    source: "Varianta A (Grila 3) / B (Grila 5)",
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
    source: "Varianta A (Grila 9) / B (Grila 6)",
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
    source: "Varianta C (Grila 2) / D (Grila 6)",
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
    source: "Varianta C (Grila 5) / D (Grila 5)",
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
    source: "Varianta C (Grila 7) / D (Grila 4)",
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
    source: "Varianta A (Grila 2) / B (Grila 2)",
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
    source: "Varianta C (Grila 6) / D (Grila 8)",
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
    source: "Varianta A (Întrebarea 12) / B (Întrebarea 15)",
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
    source: "Varianta A (Întrebarea 13) / B (Întrebarea 12)",
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
    source: "Varianta C (Întrebarea 10) / D (Întrebarea 10)",
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
    source: "Varianta C (Întrebarea 14) / D (Întrebarea 12)",
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
    source: "Varianta A (Grila 5) / B (Grila 1)",
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
    source: "Varianta A (Grila 6) / B (Grila 9)",
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
    source: "Varianta C (Grila 4) / D (Grila 7)",
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
    source: "Varianta C (Grila 8) / D (Grila 2)",
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
    source: "Varianta A (Întrebarea 14) / B (Întrebarea 14)",
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
    source: "Varianta C (Întrebarea 13) / D (Întrebarea 11)",
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
    source: "Varianta A (Grila 8) / B (Grila 8)",
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
    source: "Varianta A (Întrebarea 10) / B (Întrebarea 11)",
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
    source: "Varianta A (Întrebarea 15) / B (Întrebarea 13)",
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
    source: "Varianta C (Întrebarea 12) / D (Întrebarea 15)",
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
    source: "Varianta C (Întrebarea 15) / D (Întrebarea 13)",
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
    source: "Varianta A (Grila 4) / B (Grila 3)",
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
    source: "Varianta C (Grila 1) / D (Grila 1)",
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
    source: "Varianta A (Întrebarea 11) / B (Întrebarea 10)",
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
    source: "Varianta C (Întrebarea 11) / D (Întrebarea 14)",
    type: "open_ended",
    question: "Fie un ArrayList cu capacitate 1 și 0 elemente; de câte ori se va dubla când inserăm 40 de elemente?",
    code: null,
    sampleAnswer: "6",
    explanation: "Capacitatea inițială este 1.<br>Dublările au loc la depășirea capacității:<br>1. Inserare element 2: capacitate $1 \\to 2$<br>2. Inserare element 3: capacitate $2 \\to 4$<br>3. Inserare element 5: capacitate $4 \\to 8$<br>4. Inserare element 9: capacitate $8 \\to 16$<br>5. Inserare element 17: capacitate $16 \\to 32$<br>6. Inserare element 33: capacitate $32 \\to 64$<br>Capacitatea 64 acoperă cele 40 de elemente. În total: <strong>6</strong> dublări."
  }
];
