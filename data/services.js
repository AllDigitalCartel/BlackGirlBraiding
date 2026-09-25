/* ---------------------------------------------------------------------------
 * Service taxonomy. Each entry becomes /services/<slug>/ and is the primary
 * long-tail SEO surface ("knotless braids Annandale VA"). Every service pulls
 * its price rows from prices.js and its photographs from gallery.js by
 * category, so nothing is duplicated and nothing drifts.
 * -------------------------------------------------------------------------*/
export const services = [
  {
    slug: 'knotless-braids',
    metaTitle: "Knotless Braids in Annandale, VA",
    metaDescription: "Knotless braids in Annandale VA from $160, jumbo through small, midback to butt length. Gentler on your edges, with every price published.",
    name: 'Knotless Braids',
    short: 'Feed-in braids with no knot at the root, so they sit lighter and flatter and treat your edges far better.',
    priceGroups: ['knotless-braids'],
    galleryCategories: ['Knotless Braids'],
    duration: '4 – 7 hours',
    lasts: '6 – 8 weeks',
    body: [
      'Knotless braids are the style we’re asked for most, and for good reason. Instead of anchoring the extension with a knot at the root, we feed the hair in gradually as we braid. The result lies flat against the scalp, moves naturally from day one, and puts far less tension on your hairline than a traditional knot.',
      'We install them in jumbo, large, medium and small, at midback, waist or butt length. If you’re between sizes or unsure how much length suits you, call us. Linda will talk you through it before you book, not after.',
    ],
    faqs: [
      { q: 'Do knotless braids damage your edges?', a: 'Not when they’re done right. With no knot pulling at the root, there’s far less tension on your hairline than knotted box braids. We braid to a tension you can live with, and if anything feels tight, say so and we’ll loosen it right there.' },
      { q: 'How long do knotless braids take?', a: 'Between four and seven hours depending on the size and length you choose. Small knotless braids at butt length sit at the longer end of that range.' },
      { q: 'How long do knotless braids last?', a: 'Six to eight weeks with proper care. Wrap your hair at night, keep your scalp moisturised, and avoid re-tightening the front rows too often.' },
    ],
  },
  {
    slug: 'box-braids',
    metaTitle: "Box Braids in Annandale, VA",
    metaDescription: "Box braids in Annandale VA from $150. Large through small, waist or butt length, with clean even partings that stay sharp for weeks.",
    name: 'Box Braids',
    short: 'The classic that never goes anywhere. Crisp square partings, braided down to whatever length you want.',
    priceGroups: ['box-braids', 'janet-jackson-braids'],
    galleryCategories: ['Box Braids'],
    duration: '4 – 7 hours',
    lasts: '6 – 8 weeks',
    body: [
      'Box braids are named for the neat square sections they’re parted into, and a good box braid lives or dies by those partings. Ours are measured, even, and consistent from the crown to the nape. That’s the difference between braids that look sharp for two months and braids that look tired in two weeks.',
      'Available large through small, at waist or butt length, plus the long uniform Janet Jackson braid if you want that Poetic Justice silhouette.',
    ],
    faqs: [
      { q: 'What’s the difference between box braids and knotless braids?', a: 'Box braids start with a small knot that secures the extension at the root. Knotless braids feed the hair in gradually instead. Box braids give a fuller root and hold a defined parting beautifully; knotless braids are lighter and gentler on the scalp.' },
      { q: 'Should I wash my hair before my box braid appointment?', a: 'Please do. Freshly washed, fully dried and detangled. It makes the whole thing faster, neater and a lot comfier for you.' },
      { q: 'How much do box braids cost in Annandale?', a: 'Large box braids start at $150 at waist length. Small box braids at butt length are $350. The full breakdown by size and length is on our price list.' },
    ],
  },
  {
    slug: 'boho-braids',
    metaTitle: "Boho & French Curl Braids in Annandale",
    metaDescription: "Boho braids, French curls, bohemian and goddess braids in Annandale VA from $180. Soft curls left through the length, priced openly.",
    name: 'Boho & French Curl Braids',
    short: 'Braids finished with soft curls left loose through the length.',
    priceGroups: ['boho-french-curls', 'bohemian-braids', 'bora-bora', 'goddess-braids', 'butterfly-braids'],
    galleryCategories: ['Boho Braids'],
    duration: '5 – 8 hours',
    lasts: '6 – 8 weeks',
    body: [
      'Boho braids pair a clean braided base with curls left out along the length, so the style reads soft and undone rather than uniform. It’s the look most of our clients bring in on their phones, and the one that fills most of our gallery.',
      'We offer it across several finishes: French curls, bohemian braids, Bora Bora, goddess braids and butterfly braids. They differ in how much curl is left out and how it’s distributed. Bring a photograph and we’ll tell you honestly which one it actually is.',
    ],
    faqs: [
      { q: 'What’s the difference between boho braids and goddess braids?', a: 'Both leave curls out through the braid. Goddess braids use fewer curls, placed on purpose. Boho and bohemian pack them in denser for a fuller, softer look.' },
      { q: 'Can I wash boho braids?', a: 'Yes, but be gentle. Wash the scalp, leave the loose curls alone, and let them air dry. Scrubbing the curls is the fastest way to lose the pattern.' },
      { q: 'How long do boho braids take to install?', a: 'Five to eight hours. The curl work adds time on top of the braiding, so keep the day free.' },
    ],
  },
  {
    slug: 'passion-twist',
    metaTitle: "Passion Twists in Annandale, VA",
    metaDescription: "Passion twists in Annandale VA from $200, large through extra small. Light, wavy and long lasting, with every price published.",
    name: 'Passion Twists',
    short: 'Soft, wavy two-strand twists with gorgeous movement.',
    priceGroups: ['passion-twist'],
    galleryCategories: ['Passion Twist'],
    duration: '4 – 6 hours',
    lasts: '6 – 8 weeks',
    body: [
      'Passion twists use a soft, pre-curled wavy hair twisted in two strands, giving a looser and more romantic finish than a rope twist. They’re light to wear, quick to refresh, and a consistent favourite through the Virginia summer.',
      'We install them from large down to extra small. Smaller twists take longer and cost more, but hold their definition noticeably longer.',
    ],
    faqs: [
      { q: 'How long do passion twists last?', a: 'Six to eight weeks. Wrap them at night and the ends won’t frizz on you early.' },
      { q: 'Are passion twists heavy?', a: 'Not at all. They’re one of the lightest styles on our board, which is half the reason our girls keep asking for them.' },
      { q: 'What size passion twist should I choose?', a: 'Large is quickest and lightest. Extra small holds its pattern longest and looks the most defined. Most of our girls land on medium.' },
    ],
  },
  {
    slug: 'senegalese-and-kinky-twists',
    metaTitle: "Senegalese & Kinky Twists in Annandale",
    metaDescription: "Senegalese, kinky and spring twists in Annandale VA from $180. Sleek rope twists or natural texture, in every size, priced openly.",
    name: 'Senegalese, Kinky & Spring Twists',
    short: 'Rope twists with a sleek, polished finish, plus textured kinky and spring options.',
    priceGroups: ['senegalese-twist', 'kinky-twist', 'spring-twist', 'miracle-nuts'],
    galleryCategories: ['Senegalese Twist'],
    duration: '4 – 7 hours',
    lasts: '6 – 8 weeks',
    body: [
      'Senegalese twists are the sleek end of the twist family: two strands wound tightly for a smooth, glossy rope that hangs beautifully. Kinky twists give a more natural, textured finish, and spring twists sit springy and light with a coiled bounce.',
      'All three are available from large down to tiny, alongside our Miracle Nuts finish.',
    ],
    faqs: [
      { q: 'What’s the difference between Senegalese and kinky twists?', a: 'Senegalese twists use smooth hair for a sleek rope finish. Kinky twists use textured hair, so they blend more naturally with 4-type hair and read less shiny.' },
      { q: 'Is hair included in the price?', a: 'For most styles yes. Large kinky twists are quoted without hair, which is noted on the price list. Call us and we’ll confirm before you come in.' },
      { q: 'Do twists take less time than braids?', a: 'Usually slightly, at the same size. Twisting is faster per section than braiding, though very small twists still take a full day.' },
    ],
  },
  {
    slug: 'cornrows',
    metaTitle: "Cornrows & Ghana Braids in Annandale",
    metaDescription: "Cornrows, Ghana braids, stitch braids and Fulani styles in Annandale VA from $60. Clean lines and even tension, priced openly.",
    name: 'Cornrows, Ghana & Fulani Braids',
    short: 'Flat braids laid to the scalp, from two simple rows through to full stitch and Fulani patterns.',
    priceGroups: ['cornrows', 'feeding-braids', 'fulani-braids'],
    galleryCategories: ['Cornrows'],
    duration: '1 – 5 hours',
    lasts: '2 – 6 weeks',
    body: [
      'Cornrowing is the foundation of everything else we do, and it’s where technique shows most plainly. A straight part, an even tension and a clean line aren’t decoration. They’re what stops a style unravelling in week two.',
      'We braid everything from two simple rows through to stitch braids, Ghana braids, feed-in patterns and traditional Fulani work with cornrowed fronts and braided length. We also cornrow foundations for wigs.',
    ],
    faqs: [
      { q: 'How long do cornrows last?', a: 'Two to six weeks depending on the pattern and how much your hair grows out at the root. Feed-in and Ghana braids sit at the longer end.' },
      { q: 'How much are cornrows in Annandale?', a: 'Two cornrows start at $60. Ghana braid cornrows are $120 to $150, and stitch braid cornrows are $120. Cornrows for wigs are $45.' },
      { q: 'Do you braid cornrows for men?', a: 'Yes. Men’s cornrows are $75 large, $95 medium and $120 tiny, and we also offer gel twists.' },
    ],
  },
  {
    slug: 'locs',
    metaTitle: "Micro Locs & Faux Locs in Annandale",
    metaDescription: "Sister locks, micro locs, faux locs and butterfly locs in Annandale VA. Consultation $35, installs from $220, quoted before you book.",
    name: 'Micro Locs, Sister Locks & Faux Locs',
    short: 'From a starter consultation through to full sister locks, faux locs and butterfly locs.',
    priceGroups: ['locs'],
    // No photograph in the client's set shows locs. These are shown as general
    // salon work under an honest heading, never captioned as locs.
    galleryCategories: ['Knotless Braids', 'Senegalese Twist'],
    galleryIllustrative: true,
    duration: '5 hours – 2 days',
    lasts: 'Permanent (locs) / 6 – 8 weeks (faux)',
    body: [
      'Locs are a commitment, and we treat them like one. Sister locks begin with a $35 consultation where we look at your hair density, texture and scalp health and tell you honestly whether it’s the right route for you, before you pay for the install.',
      'If you want the look without the commitment, faux locs and butterfly locs give you the same silhouette as a temporary protective style, installed in large, medium, small or tiny.',
    ],
    faqs: [
      { q: 'Why do sister locks need a consultation first?', a: 'Because grid size, hair density and scalp condition determine whether the install will hold and how many locs you’ll need. That changes both the result and the price, so we assess it properly rather than guessing.' },
      { q: 'How much do sister locks cost in Annandale?', a: 'The consultation is $35. Full installation starts at $800 and is quoted after the consultation, because it depends on your hair density and the grid size we agree on.' },
      { q: 'What’s the difference between faux locs and real locs?', a: 'Faux locs are extensions wrapped to imitate locs and come out after six to eight weeks. Real locs form from your own hair and are permanent.' },
    ],
  },
  {
    slug: 'crochet-and-curls',
    metaTitle: "Crochet Braids & Curls in Annandale",
    metaDescription: "Crochet braids and curl sets in Annandale VA from $250. Full volume in two to four hours, with no full braid-down and no surprise pricing.",
    name: 'Crochet & Curls',
    short: 'Crochet installs and curl sets for volume without a full braid-down.',
    priceGroups: ['boho-french-curls'],
    galleryCategories: ['Crochet & Curls'],
    duration: '2 – 4 hours',
    lasts: '4 – 8 weeks',
    body: [
      'Crochet is the fastest route to a full head of curls. We braid a flat cornrow foundation and then crochet the hair through it, which cuts install time dramatically compared with braiding every strand.',
      'It suits anyone who wants volume, colour or a shorter curly silhouette without committing a full day to the chair.',
    ],
    faqs: [
      { q: 'How long does a crochet install take?', a: 'Two to four hours including the cornrow foundation, which makes it one of the quickest protective styles we offer.' },
      { q: 'Can I choose the colour?', a: 'Yes. Bring the hair you want or call ahead and we’ll advise on what works with your foundation.' },
      { q: 'How long does crochet hair last?', a: 'Four to eight weeks. The foundation braids are usually what determine when it needs redoing, not the crochet hair itself.' },
    ],
  },
  {
    slug: 'kids-braids',
    metaTitle: "Kids Braids in Annandale, VA",
    metaDescription: "Kids braids in Annandale VA from $80. Cornrows, beads, extensions and knotless, braided gently enough for little ones to sit through.",
    name: 'Kids Braids',
    short: 'Gentle, patient braiding for our youngest clients.',
    priceGroups: ['kids-braids'],
    galleryCategories: ['Kids Braids'],
    duration: '1 – 4 hours',
    lasts: '4 – 6 weeks',
    body: [
      'Children aren’t small adults, and we don’t braid them as though they’re. We work at a tension a child can actually sit through, take breaks when they need them, and we would rather a style take twenty minutes longer than have a child leave sore.',
      'Cornrows, beaded styles, cornrow extensions and knotless braids are all available, with pricing banded by age.',
    ],
    faqs: [
      { q: 'How much are kids braids in Annandale?', a: 'Kids cornrows are $80 and cornrow extensions are $140. Medium knotless braids run $160 for ages five to eleven and $200 from age thirteen.' },
      { q: 'How long will my child need to sit still?', a: 'One to four hours depending on the style. Bring a tablet, a snack and headphones. Most of our young clients do.' },
      { q: 'Are braids safe for a child’s hair?', a: 'Yes, when the tension is right. We braid children loosely on purpose. A style should never be tight enough to pull at the hairline or make the scalp sore.' },
    ],
  },
  {
    slug: 'mens-braids',
    metaTitle: "Men's Braids & Cornrows in Annandale",
    metaDescription: "Men's cornrows and gel twists in Annandale VA from $75. Straight-backs, patterns and tiny rows, most of them done inside two hours.",
    name: "Men's Braids & Twists",
    short: 'Cornrows and gel twists for men, in every size.',
    priceGroups: ['mens-braids'],
    galleryCategories: ['Cornrows'],
    galleryIllustrative: true,
    duration: '1 – 3 hours',
    lasts: '2 – 4 weeks',
    body: [
      'Straight-backs, patterns, tiny cornrows and gel twists, booked and priced simply, and finished quickly.',
      'Most men’s appointments are done inside two hours. Call ahead and we’ll usually fit you in the same week.',
    ],
    faqs: [
      { q: 'How much are men’s cornrows in Annandale?', a: 'Large cornrows are $75, medium $95 and tiny $120. Gel twists are $80 for level 1 and $100 for level 2.' },
      { q: 'How long do men’s cornrows last?', a: 'Two to four weeks. Wearing a durag at night will noticeably extend that.' },
      { q: 'Do I need an appointment?', a: 'Calling ahead is best, especially at weekends. Men’s styles are quick, so we can often fit you in at short notice.' },
    ],
  },
  {
    slug: 'sew-ins-and-weaves',
    metaTitle: "Sew-Ins & Weaves in Annandale, VA",
    metaDescription: "Full and partial sew-ins, lace closures and wig cornrows in Annandale VA from $45. Careful braid removal from $50, all priced openly.",
    name: 'Sew-Ins, Weaves & Wig Prep',
    short: 'Full and partial sew-ins, lace closures and cornrow foundations for wigs.',
    priceGroups: ['sew-in-weave', 'braid-removal'],
    // Likewise: no sew-in photographs were supplied.
    galleryCategories: ['Crochet & Curls', 'Box Braids'],
    galleryIllustrative: true,
    duration: '2 – 4 hours',
    lasts: '6 – 10 weeks',
    body: [
      'Sew-ins give length and fullness with your natural hair braided down and protected underneath. We install full sew-ins at two levels, partial sew-ins for blended styles, and lace closures for a natural-looking parting.',
      'We also cornrow foundations for wigs at $45, and take down old braids carefully at $50 to $80 so your natural hair comes out of a style as healthy as it went in.',
    ],
    faqs: [
      { q: 'What’s the difference between a full and a partial sew-in?', a: 'A full sew-in covers all your natural hair. A partial sew-in leaves some of your own hair out to blend over the tracks, which reads more naturally but needs more daily styling.' },
      { q: 'Do you remove old braids?', a: 'Yes. Removal is $50 for level 1 and $80 for level 2. We take our time with it, because rushing a take-down is how people lose length.' },
      { q: 'How long does a sew-in last?', a: 'Six to ten weeks. Beyond that the braids underneath grow out and the tracks start to loosen.' },
    ],
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
export default services;
