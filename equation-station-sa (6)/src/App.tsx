/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter,
  MessageCircle,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Calculator,
  FunctionSquare,
  Pi,
  Sigma,
  Target,
  Users,
  FileText,
  ChevronLeft,
  ExternalLink,
  Lightbulb,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  Trophy
} from 'lucide-react';

// --- KaTeX Renderer Component ---
const Latex = ({ formula, block = false }: { formula: string, block?: boolean }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current && (window as any).katex) {
      try {
        (window as any).katex.render(formula, containerRef.current, {
          throwOnError: false,
          displayMode: block,
          trust: true
        });
      } catch (e) {
        console.error("KaTeX error:", e);
      }
    }
  }, [formula, block]);

  return <span ref={containerRef} className={block ? "block my-4" : "inline-block"} />;
};

// --- Custom TikTok Icon ---
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 3.44-.3 6.88-.45 10.32-.13 1.58-.82 3.12-2.14 4.03-1.39.97-3.21 1.25-4.84.81-1.57-.42-2.92-1.52-3.63-2.94-.74-1.45-.78-3.21-.12-4.63.65-1.42 2.01-2.48 3.55-2.77.19-.04.38-.07.58-.1v4.02c-.17.02-.35.05-.51.1-.79.2-1.46.75-1.76 1.5-.31.76-.25 1.65.18 2.34.41.66 1.17 1.07 1.94 1.07.82-.01 1.55-.57 1.81-1.34.13-.38.18-.78.17-1.18V.02z"/>
  </svg>
);

// --- Types ---
interface Topic {
  id: string;
  title: string;
  paper: 1 | 2;
  icon: any;
  description: string;
  concepts: string[];
  formulas: string[];
  mistakes: string[];
  afterLesson: string[];
  coreSkills: string[];
  imageUrl: string;
  videoUrl?: string;
}

// --- Data ---
const TOPICS: Topic[] = [
  // Paper 1
  { 
    id: 'algebra', 
    title: 'Algebra', 
    paper: 1, 
    icon: Sigma, 
    description: 'Quadratic equations, inequalities, and nature of roots.',
    imageUrl: 'https://images.pexels.com/photos/8471818/pexels-photo-8471818.jpeg?auto=compress&cs=tinysrgb&w=1200',
    concepts: [
      'Quadratic equations and inequalities',
      'Nature of roots (Real, Rational, Irrational, Non-real)',
      'Equations in two unknowns (one linear, one quadratic)',
      'Word problems involving quadratic equations'
    ],
    formulas: [
      'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      '\\Delta = b^2 - 4ac',
      '\\Delta > 0 \\text{ (Real)}, \\Delta = 0 \\text{ (Equal)}, \\Delta < 0 \\text{ (Non-real)}'
    ],
    mistakes: [
      'Forgetting to change the inequality sign when multiplying/dividing by a negative number.',
      'Incorrectly factorising trinomials with a leading coefficient other than 1.',
      'Not checking if the solutions to a word problem are valid (e.g., length cannot be negative).'
    ],
    afterLesson: [
      'Solve any quadratic equation using the formula.',
      'Determine the nature of roots without solving the equation.',
      'Solve simultaneous equations with one quadratic.'
    ],
    coreSkills: [
      'Factorisation techniques',
      'Substitution in simultaneous equations',
      'Interpreting word problems into algebraic models'
    ]
  },
  { 
    id: 'patterns-sequences', 
    title: 'Patterns & Sequences', 
    paper: 1, 
    icon: FunctionSquare, 
    description: 'Arithmetic and geometric sequences and series.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200',
    concepts: [
      'Arithmetic and Geometric sequences and series',
      'Sigma notation (Σ)',
      'Formulae for the sum of arithmetic and geometric series',
      'Convergent geometric series and sum to infinity (S∞)'
    ],
    formulas: [
      'T_n = a + (n-1)d',
      'S_n = \\frac{n}{2} [2a + (n-1)d]',
      'T_n = ar^{n-1}',
      'S_n = \\frac{a(r^n - 1)}{r - 1}',
      'S_\\infty = \\frac{a}{1 - r} \\quad \\text{for } -1 < r < 1'
    ],
    mistakes: [
      'Confusing "n" (the position) with "Tn" (the value of the term).',
      'Using the arithmetic sum formula for a geometric series.',
      'Forgetting the condition for convergence (-1 < r < 1) when calculating S∞.'
    ],
    afterLesson: [
      'Identify the type of sequence from a given set of terms.',
      'Calculate the sum of a series using sigma notation.',
      'Determine if a geometric series converges.'
    ],
    coreSkills: [
      'Algebraic manipulation of exponents',
      'Solving for n in exponential equations',
      'Identifying common differences and ratios'
    ]
  },
  { 
    id: 'functions-graphs', 
    title: 'Functions & Graphs', 
    paper: 1, 
    icon: FunctionSquare, 
    description: 'Formal definition of functions and their inverses.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
    concepts: [
      'Formal definition of a function',
      'Inverse functions (f⁻¹) and domain restriction',
      'Graphs of inverses: y = ax + q, y = ax², y = bˣ',
      'Logarithmic functions as inverses of exponential functions'
    ],
    formulas: [
      'y = mx + c',
      'y = a(x-p)^2 + q',
      'y = \\frac{a}{x-p} + q',
      'y = \\log_b(x) \\leftrightarrow x = b^y'
    ],
    mistakes: [
      'Not restricting the domain of a parabola (y=x²) to make its inverse a function.',
      'Confusing the vertical asymptote (x=p) with the horizontal asymptote (y=q).',
      'Incorrectly reflecting a graph across the line y=x for inverses.'
    ],
    afterLesson: [
      'Sketch the inverse of any given function.',
      'Determine the equation of a function from its graph.',
      'Apply domain restrictions to ensure an inverse is a function.'
    ],
    coreSkills: [
      'Graph sketching',
      'Finding intercepts and turning points',
      'Understanding transformations (shifts and stretches)'
    ]
  },
  { 
    id: 'finance', 
    title: 'Finance', 
    paper: 1, 
    icon: Calculator, 
    description: 'Annuities, sinking funds, and loan analysis.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
    concepts: [
      'Future value and Present value annuities',
      'Calculating n (time period) using logarithms',
      'Sinking funds and asset replacement',
      'Critically analyse different loan and investment options'
    ],
    formulas: [
      'A = P(1 + i)^n',
      'F = \\frac{x[(1 + i)^n - 1]}{i}',
      'P = \\frac{x[1 - (1 + i)^{-n}]}{i}',
      '1 + i_{eff} = (1 + \\frac{i_{nom}}{m})^m'
    ],
    mistakes: [
      'Using the wrong annuity formula (F vs P) for a specific scenario.',
      'Not adjusting the interest rate (i) and time (n) for monthly/quarterly compounding.',
      'Forgetting that "n" in the PV formula is negative (-n).'
    ],
    afterLesson: [
      'Calculate monthly bond or loan repayments.',
      'Determine the future value of a savings plan.',
      'Calculate the time required to reach a financial goal.'
    ],
    coreSkills: [
      'Using logarithms to solve for n',
      'Adjusting nominal rates to periodic rates',
      'Timeline analysis for complex finance problems'
    ]
  },
  { 
    id: 'polynomials', 
    title: 'Polynomials', 
    paper: 1, 
    icon: Sigma, 
    description: 'Remainder and Factor theorems for cubic equations.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    concepts: [
      'Remainder and Factor Theorems for polynomials up to 3rd degree',
      'Factorising third-degree polynomials',
      'Solving cubic equations',
      'Applications of the Factor Theorem'
    ],
    formulas: [
      'f(x) = (x-a)Q(x) + R',
      'R = f(a)',
      'f(x) = ax^3 + bx^2 + cx + d'
    ],
    mistakes: [
      'Incorrectly calculating f(a) due to sign errors (e.g., using f(2) instead of f(-2)).',
      'Not using synthetic division or long division correctly to find the remaining quadratic factor.',
      'Forgetting to factorise the resulting quadratic factor completely.'
    ],
    afterLesson: [
      'Find the remainder when a polynomial is divided by a linear factor.',
      'Factorise any cubic polynomial completely.',
      'Solve cubic equations to find x-intercepts of graphs.'
    ],
    coreSkills: [
      'Synthetic division',
      'Long division of polynomials',
      'Grouping terms for factorisation'
    ]
  },
  { 
    id: 'calculus', 
    title: 'Calculus', 
    paper: 1, 
    icon: Calculator, 
    description: 'Differentiation, cubic graphs, and optimization.',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    concepts: [
      'Limits and differentiation from first principles',
      'Rules of differentiation',
      'Equations of tangents to graphs',
      'Sketching cubic graphs (stationary points and concavity)',
      'Practical problems involving optimization and rates of change'
    ],
    formulas: [
      'f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
      '\\frac{d}{dx} [x^n] = nx^{n-1}',
      'm_{tangent} = f\'(x_{point})',
      'f\'(x) = 0 \\quad \\text{(Stationary Points)}'
    ],
    mistakes: [
      'Forgetting to write "lim h→0" in every step of first principles until the final substitution.',
      'Incorrectly differentiating terms with x in the denominator (e.g., 1/x²).',
      'Confusing the x-intercepts of the derivative graph with the stationary points of the original graph.'
    ],
    afterLesson: [
      'Differentiate any polynomial function.',
      'Find the equation of a tangent to a curve.',
      'Solve real-world optimization problems (max/min area or volume).'
    ],
    coreSkills: [
      'Applying the power rule',
      'Interpreting the first and second derivative',
      'Solving for x when f\'(x) = 0'
    ]
  },
  { 
    id: 'probability', 
    title: 'Probability', 
    paper: 1, 
    icon: Target, 
    description: 'Counting principles and complex probability.',
    imageUrl: 'https://images.pexels.com/photos/965875/pexels-photo-965875.jpeg?auto=compress&cs=tinysrgb&w=1200',
    concepts: [
      'Fundamental counting principle',
      'Probability problems using the counting principle',
      'Venn diagrams, tree diagrams, and contingency tables',
      'Independent and mutually exclusive events'
    ],
    formulas: [
      'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
      'P(A \\cap B) = 0 \\quad \\text{(Mutually Exclusive)}',
      'P(A \\cap B) = P(A) \\times P(B) \\quad \\text{(Independent)}',
      'n! \\quad \\text{(Permutations)}'
    ],
    mistakes: [
      'Adding probabilities that are not mutually exclusive without subtracting the intersection.',
      'Confusing "independent" with "mutually exclusive".',
      'Not accounting for repetitions in counting problems (e.g., letters in a word).'
    ],
    afterLesson: [
      'Calculate the number of arrangements of objects.',
      'Solve probability problems involving multiple events.',
      'Use Venn diagrams to organize complex probability data.'
    ],
    coreSkills: [
      'Factorial calculations',
      'Interpreting "at least" and "at most" problems',
      'Constructing tree diagrams'
    ]
  },
  // Paper 2
  { 
    id: 'statistics', 
    title: 'Statistics', 
    paper: 2, 
    icon: Target, 
    description: 'Bivariate data, regression, and correlation.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    concepts: [
      'Bivariate numerical data and scatter plots',
      'Least squares regression line (y = a + bx)',
      'Correlation coefficient (r) and its interpretation',
      'Symmetric and skewed data analysis'
    ],
    formulas: [
      '\\hat{y} = a + bx',
      'r \\in [-1; 1]',
      '\\sigma = \\sqrt{\\frac{\\sum(x-\\bar{x})^2}{n}}'
    ],
    mistakes: [
      'Interchanging the "a" and "b" values from the calculator in the regression equation.',
      'Misinterpreting a strong negative correlation as "no correlation".',
      'Not identifying outliers correctly before calculating the line of best fit.'
    ],
    afterLesson: [
      'Calculate the line of best fit using a calculator.',
      'Interpret the strength and direction of correlation.',
      'Predict values using the regression equation (interpolation/extrapolation).'
    ],
    coreSkills: [
      'Using scientific calculator statistics mode',
      'Interpreting scatter plots',
      'Understanding data distribution'
    ]
  },
  { 
    id: 'analytical-geometry', 
    title: 'Analytical Geometry', 
    paper: 2, 
    icon: FunctionSquare, 
    description: 'Circles and tangents in the Cartesian plane.',
    imageUrl: 'https://images.pexels.com/photos/5212325/pexels-photo-5212325.jpeg?auto=compress&cs=tinysrgb&w=1200',
    concepts: [
      'Equation of a circle with centre (a; b) and radius r',
      'Equation of a tangent to a circle at a given point',
      'Properties of circles and lines in coordinate geometry',
      'Distance, gradient, and midpoint formulae revision'
    ],
    formulas: [
      'd = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}',
      'M = (\\frac{x_1+x_2}{2} ; \\frac{y_1+y_2}{2})',
      'm = \\frac{y_2-y_1}{x_2-x_1}',
      '(x-a)^2 + (y-b)^2 = r^2'
    ],
    mistakes: [
      'Forgetting that the gradient of the tangent is the negative reciprocal of the radius gradient (m1 × m2 = -1).',
      'Using the diameter instead of the radius in the circle equation.',
      'Incorrectly substituting coordinates into the distance formula (swapping x and y).'
    ],
    afterLesson: [
      'Find the equation of a circle given its centre and a point.',
      'Determine the equation of a tangent to a circle.',
      'Solve for unknown coordinates using geometric properties.'
    ],
    coreSkills: [
      'Completing the square to find circle centre',
      'Applying perpendicular gradient rule',
      'Distance and midpoint calculations'
    ]
  },
  { 
    id: 'trigonometry', 
    title: 'Trigonometry', 
    paper: 2, 
    icon: Pi, 
    description: 'Compound angles and 3D problems.',
    imageUrl: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&q=80&w=1200',
    concepts: [
      'Compound angle identities: sin(α ± β) and cos(α ± β)',
      'Double angle identities: sin 2α, cos 2α, tan 2α',
      'Solving problems in two and three dimensions',
      'General and specific solutions of trig equations'
    ],
    formulas: [
      '\\sin(A \\pm B) = \\sin A \\cos B \\pm \\cos A \\sin B',
      '\\cos(A \\pm B) = \\cos A \\cos B \\mp \\sin A \\sin B',
      '\\sin 2A = 2 \\sin A \\cos A',
      '\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A'
    ],
    mistakes: [
      'Forgetting to include "+ k·360°" or "+ k·180°" in the general solution.',
      'Incorrectly expanding cos(A+B) as cosA + cosB.',
      'Not checking which quadrant the angle lies in when solving equations.'
    ],
    afterLesson: [
      'Prove trigonometric identities using compound angles.',
      'Solve trig equations for general and specific solutions.',
      'Calculate heights and distances in 3D using sine and cosine rules.'
    ],
    coreSkills: [
      'Identity substitution',
      'Solving for θ in complex equations',
      'Visualizing 3D geometric shapes'
    ]
  },
  { 
    id: 'euclidean-geometry', 
    title: 'Euclidean Geometry', 
    paper: 2, 
    icon: BookOpen, 
    description: 'Proportionality and similarity theorems.',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200',
    concepts: [
      'Proportionality Theorem: line parallel to one side of a triangle',
      'Similarity Theorems: equiangular triangles and sides in proportion',
      'Pythagorean Theorem proof using similarity',
      'Solving circle geometry riders with reasons'
    ],
    formulas: [
      '\\frac{AD}{DB} = \\frac{AE}{EC} \\quad \\text{(if } DE \\parallel BC \\text{)}',
      '\\Delta ABC \\parallel\\parallel\\parallel \\Delta DEF \\quad \\text{(Similarity)}',
      '\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height}'
    ],
    mistakes: [
      'Not providing valid reasons for every statement in a geometry proof.',
      'Assuming a line is a tangent or a diameter without it being stated or proven.',
      'Confusing "congruency" (identical) with "similarity" (same shape, different size).'
    ],
    afterLesson: [
      'Prove the proportionality theorem.',
      'Identify similar triangles and use ratios to find lengths.',
      'Solve complex circle geometry riders with full reasoning.'
    ],
    coreSkills: [
      'Logical proof construction',
      'Identifying geometric patterns',
      'Using theorem abbreviations correctly'
    ]
  },
];

// --- Components ---

const SocialLinks = ({ className = "" }: { className?: string }) => {
  const links = [
    { icon: Youtube, href: "https://www.youtube.com/@theequationstationsa", label: "YouTube" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@theequationstationsa", label: "TikTok" },
    { icon: Instagram, href: "https://www.instagram.com/equationstationsa", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/equationstationsa", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/equationstatio", label: "Twitter" },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => (
        <a 
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy/60 hover:text-gold transition-colors"
          aria-label={link.label}
        >
          <link.icon size={20} />
        </a>
      ))}
    </div>
  );
};

const Navbar = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Topics', href: '#topics' },
    { name: 'Tutoring', href: '#tutoring' },
    { name: 'YouTube', href: 'https://www.youtube.com/@theequationstationsa', external: true },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'py-4 bg-white/80 backdrop-blur-xl shadow-lg border-b border-navy/5' : 'py-8 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group"
        >
          <div className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center text-white text-2xl font-display group-hover:bg-gold transition-colors shadow-lg shadow-navy/20 group-hover:shadow-gold/20">
            ∑
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-bold text-navy tracking-tight leading-none">
              Equation Station <span className="text-gold">SA</span>
            </span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="text-navy font-bold hover:text-gold transition-colors text-sm uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/27610291422"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-navy text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gold transition-all shadow-lg shadow-navy/10 hover:shadow-gold/20 text-sm"
          >
            BOOKING
          </a>
        </div>

        <button 
          className="md:hidden w-12 h-12 bg-surface rounded-xl flex items-center justify-center text-navy"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-navy/5 overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="block text-lg font-bold text-navy py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://wa.me/27610291422"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-navy text-white text-center py-4 rounded-xl font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BOOKING
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-gold-pale text-gold px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase mb-8 border border-gold/10">
              <GraduationCap size={16} />
              Grade 12 CAPS Mathematics
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display text-navy leading-[1.05] mb-8 text-balance">
              Master Grade 12 <br />
              <span className="text-gold italic">Mathematics</span>
            </h1>

            <p className="text-xl md:text-2xl text-navy/60 mb-12 leading-relaxed max-w-xl">
              CAPS-aligned revision and tutoring. Join Chris Khomo to master every concept with clarity and confidence for your final exams.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a href="#topics" className="w-full sm:w-auto bg-navy text-white px-10 py-5 rounded-2xl font-bold hover:bg-navy/90 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-navy/20">
                Explore Topics <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://wa.me/27610291422" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-navy border-2 border-navy/10 px-10 py-5 rounded-2xl font-bold hover:border-gold hover:text-gold transition-all flex items-center justify-center gap-3"
              >
                BOOKING
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" 
                alt="Diverse group of teenagers collaborating on mathematics in a modern academic setting" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Success Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-12 -right-6 bg-white p-5 rounded-2xl shadow-2xl border border-navy/5 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-navy/40 uppercase tracking-widest">Exam Readiness</p>
                    <p className="text-sm font-bold text-navy">98% Mastery</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Topics = ({ onSelectTopic }: { onSelectTopic: (topic: Topic) => void }) => {
  const paper1 = TOPICS.filter(t => t.paper === 1);
  const paper2 = TOPICS.filter(t => t.paper === 2);

  return (
    <section id="topics" className="py-32 bg-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-gold-pale text-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6">
            <BookOpen size={16} />
            Curriculum Overview
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-navy mb-8">Mathematics Topics</h2>
          <p className="text-navy/60 max-w-2xl mx-auto text-xl leading-relaxed">
            Comprehensive CAPS-aligned content for Paper 1 and Paper 2. Select a topic to begin your mastery.
          </p>
        </div>

        <div className="space-y-32">
          {/* Paper 1 */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 bg-navy text-white rounded-2xl flex items-center justify-center text-2xl font-display shadow-xl shadow-navy/20">1</div>
              <div>
                <h3 className="text-3xl font-display text-navy">Paper 1: Algebraic & Calculus</h3>
                <p className="text-navy/40 font-bold uppercase tracking-widest text-sm mt-1">Algebra, Functions, Finance, Calculus, Probability</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paper1.map((topic, idx) => (
                <TopicCard key={topic.id} topic={topic} onClick={() => onSelectTopic(topic)} index={idx} />
              ))}
            </div>
          </div>

          {/* Paper 2 */}
          <div>
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 bg-gold text-white rounded-2xl flex items-center justify-center text-2xl font-display shadow-xl shadow-gold/20">2</div>
              <div>
                <h3 className="text-3xl font-display text-navy">Paper 2: Geometry & Trigonometry</h3>
                <p className="text-navy/40 font-bold uppercase tracking-widest text-sm mt-1">Statistics, Analytical Geometry, Trigonometry, Euclidean Geometry</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {paper2.map((topic, idx) => (
                <TopicCard key={topic.id} topic={topic} onClick={() => onSelectTopic(topic)} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TopicCard = ({ topic, onClick, index }: { topic: Topic, onClick: () => void, index: number, key?: string | number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden border border-navy/5 border-solid hover:border-gold/30 transition-all hover:shadow-2xl hover:shadow-gold/10 flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={topic.imageUrl} 
          alt={topic.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-colors" />
        <div className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-navy shadow-lg">
          <topic.icon size={24} />
        </div>
      </div>
      
      <div className="p-10 flex flex-col flex-grow">
        <h3 className="text-2xl font-display text-navy mb-4 group-hover:text-gold transition-colors">{topic.title}</h3>
        <p className="text-navy/60 mb-8 line-clamp-2 leading-relaxed">{topic.description}</p>
        
        <div className="mt-auto pt-8 border-t border-navy/5 border-solid flex items-center justify-between">
          <span className="text-navy/40 font-bold text-xs uppercase tracking-widest">Master Topic</span>
          <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-navy group-hover:bg-gold group-hover:text-white transition-all">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TopicDetail = ({ topic, onBack }: { topic: Topic, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-navy/60 hover:text-gold transition-colors mb-8 group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Topics
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Content */}
          <div className="lg:col-span-8">
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <img 
                src={topic.imageUrl} 
                alt={topic.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                <div className="inline-flex items-center gap-2 bg-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                  Paper {topic.paper}
                </div>
                <h1 className="text-4xl md:text-6xl font-display text-white mb-4 leading-tight">{topic.title}</h1>
                <p className="text-white/80 max-w-xl text-lg">{topic.description}</p>
              </div>
            </div>

            {/* Learning Sections */}
            <div className="space-y-20">
              {/* Key Concepts */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-gold rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-display text-navy">Key Concepts</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topic.concepts.map((concept, i) => (
                    <div key={i} className="p-8 bg-surface border border-navy/5 rounded-[2rem] flex items-start gap-5 hover:border-gold/20 transition-colors">
                      <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-navy/80 font-medium leading-relaxed">{concept}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Formulas */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-gold rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-display text-navy">Essential Formulas</h2>
                </div>
                <div className="bg-navy text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <div className="space-y-12 relative z-10">
                    {topic.formulas.map((formula, i) => (
                      <div key={i} className="pb-10 border-b border-white/10 last:border-0 last:pb-0 flex flex-col items-center">
                        <Latex formula={formula} block />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Core Skills */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-gold rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-display text-navy">Core Skills Mastery</h2>
                </div>
                <div className="bg-surface p-10 rounded-[3rem] border border-navy/5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {topic.coreSkills.map((skill, i) => (
                      <div key={i} className="text-center group">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-gold mx-auto mb-6 border border-navy/5 group-hover:scale-110 transition-transform">
                          <Trophy size={28} />
                        </div>
                        <p className="text-navy font-bold leading-tight">{skill}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* After This Lesson */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-gold rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-display text-navy">Learning Outcomes</h2>
                </div>
                <div className="space-y-5">
                  {topic.afterLesson.map((item, i) => (
                    <div key={i} className="flex items-center gap-5 p-6 bg-gold-pale/40 rounded-2xl border border-gold/10">
                      <Sparkles size={22} className="text-gold flex-shrink-0" />
                      <span className="text-navy/80 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Common Mistakes */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-red-500 rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-display text-navy">Common Exam Pitfalls</h2>
                </div>
                <div className="bg-red-50/30 p-10 rounded-[3rem] border border-red-100 space-y-8">
                  {topic.mistakes.map((mistake, i) => (
                    <div key={i} className="flex items-start gap-5">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                        <AlertTriangle size={20} />
                      </div>
                      <p className="text-navy/80 italic leading-relaxed text-lg">{mistake}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Video Placeholder */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-10 bg-gold rounded-full" />
                  <h2 className="text-3xl md:text-4xl font-display text-navy">Video Masterclass</h2>
                </div>
                <div className="aspect-video bg-navy/5 rounded-[3rem] flex items-center justify-center border border-navy/10 group cursor-pointer overflow-hidden relative shadow-inner">
                  <div className="text-center z-10">
                    <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 group-hover:scale-110 transition-transform shadow-2xl shadow-red-600/30">
                      <PlayCircle size={48} />
                    </div>
                    <p className="text-navy font-bold text-2xl">Watch Chris Khomo's Lesson</p>
                    <p className="text-navy/40 text-lg mt-3">Step-by-step guidance for {topic.title}</p>
                  </div>
                  <div className="absolute inset-0 bg-navy/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </section>

              {/* Resources */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 bg-gold-pale rounded-2xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                      <FileText size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-navy">Practice Set</h3>
                  </div>
                  <p className="text-navy/60 mb-10 leading-relaxed text-lg">Foundational problems designed to solidify your core understanding.</p>
                  <button className="w-full bg-surface text-navy font-bold py-5 rounded-2xl border border-navy/10 flex items-center justify-center gap-3 hover:border-gold hover:text-gold transition-all">
                    Download PDF <ExternalLink size={18} />
                  </button>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 bg-navy/5 rounded-2xl flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors">
                      <Target size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-navy">Exam Prep</h3>
                  </div>
                  <p className="text-navy/60 mb-10 leading-relaxed text-lg">Higher-order problems and past paper questions for final exam mastery.</p>
                  <button className="w-full bg-navy text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-navy/90 transition-all shadow-lg shadow-navy/20">
                    Start Practice <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-10">
              <div className="bg-navy text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                <h3 className="text-3xl font-display mb-6 relative z-10">1-on-1 Help</h3>
                <p className="text-white/60 mb-10 leading-relaxed text-lg relative z-10">Struggling with {topic.title}? Book a personalized session with Chris Khomo.</p>
                <a 
                  href="https://wa.me/27610291422"
                  className="block w-full bg-gold text-white text-center py-5 rounded-2xl font-bold hover:bg-gold-light transition-all shadow-xl shadow-gold/20 relative z-10 text-lg"
                >
                  Book Tutoring
                </a>
              </div>
              
              <div className="bg-surface p-12 rounded-[3.5rem] border border-navy/5">
                <div className="flex items-center gap-4 mb-8">
                  <GraduationCap className="text-gold" size={32} />
                  <h3 className="text-2xl font-bold text-navy">Study Notes</h3>
                </div>
                <p className="text-navy/60 mb-10 leading-relaxed text-lg">Comprehensive PDF notes covering all sub-topics and exam techniques.</p>
                <button className="w-full border-2 border-navy/10 py-5 rounded-2xl font-bold text-navy hover:border-gold hover:text-gold transition-all bg-white text-lg">
                  Download Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    { 
      title: "Watch Lessons", 
      description: "Access high-quality video lessons covering every concept in the CAPS curriculum.",
      icon: PlayCircle 
    },
    { 
      title: "Practice Problems", 
      description: "Work through exam-style questions with step-by-step solutions to build confidence.",
      icon: BookOpen 
    },
    { 
      title: "Get Tutoring Help", 
      description: "Book one-on-one online sessions for personalized guidance on difficult topics.",
      icon: Users 
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-navy mb-4">How It Works</h2>
          <p className="text-navy/60 max-w-xl mx-auto">A focused approach to mastering the Grade 12 CAPS Mathematics curriculum.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gold-pale rounded-full flex items-center justify-center text-gold mx-auto mb-6">
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-4">{step.title}</h3>
              <p className="text-navy/60 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Tutoring = () => {
  return (
    <section id="tutoring" className="py-24 bg-navy text-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-8 border border-white/10">
              <Users size={16} />
              Personalized Learning
            </div>
            <h2 className="text-4xl md:text-6xl font-display mb-8 leading-tight">1-on-1 Online <br /><span className="text-gold italic">Tutoring</span></h2>
            <p className="text-white/70 text-xl mb-10 leading-relaxed">
              Get personalized help from Chris Khomo. Our online sessions are designed to target your specific weaknesses and prepare you for the NSC exams with confidence.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center text-gold flex-shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="font-bold text-lg">R300 per hour</p>
                  <p className="text-white/40 text-sm">Affordable tutoring help</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center text-gold flex-shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="font-bold text-lg">Online Sessions</p>
                  <p className="text-white/40 text-sm">Learn from anywhere</p>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/27610291422" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gold text-white px-10 py-5 rounded-2xl font-bold hover:bg-gold-light transition-all shadow-xl shadow-gold/20 text-lg"
            >
              <MessageCircle size={24} />
              Chat on WhatsApp
            </a>
          </div>

          <div className="relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-square border-8 border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200" 
                alt="Online tutoring session" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-navy/20" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold rounded-full blur-3xl opacity-20" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-white rounded-full blur-3xl opacity-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-display text-navy mb-6">Master your Maths results</h2>
        <p className="text-navy/60 mb-10 max-w-2xl mx-auto">
          Our YouTube channel provides step-by-step guidance to help you master difficult concepts and excel in your exams.
        </p>
        <a 
          href="https://www.youtube.com/@theequationstationsa" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
        >
          <Youtube size={20} /> Watch on YouTube
        </a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-display text-gold">∑</span>
              <span className="text-xl font-bold text-navy tracking-tight">
                Equation Station <span className="text-gold">SA</span>
              </span>
            </a>
            <p className="text-navy/40 text-sm max-w-xs">
              Master CAPS Mathematics with clarity and confidence. Grade 12 exam revision and tutoring.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="text-sm font-bold text-navy">Follow Us</div>
            <SocialLinks />
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-navy/30">
          <div>© {new Date().getFullYear()} Equation Station SA. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Instructor: Chris Khomo</span>
            <span>Contact: +27 61 029 1422</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleNavigate = (page: string) => {
    if (page === 'home') setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={handleNavigate} />
      <main>
        <AnimatePresence mode="wait">
          {selectedTopic ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TopicDetail 
                topic={selectedTopic} 
                onBack={() => setSelectedTopic(null)} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <Topics onSelectTopic={setSelectedTopic} />
              <HowItWorks />
              <Tutoring />
              <SocialProof />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
