export const SITE_INFO = {
  name: "Fore Our Schools Foundation",
  shortName: "Fore Our Schools",
  address: "1018 Del Rio Way, Moraga, CA 94556",
  email: "foreourschools925@gmail.com",
  taxId: "26-1806430",
  foundedYear: 2007,
  firstTournamentYear: 2008,
  mapCoords: { lat: 37.840994, lng: -122.117531 },
  instagram: "https://www.instagram.com/foreourschools/",
  facebook: "https://www.facebook.com/ForeOurSchools/",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const SCHOOLS = [
  { name: "Camino Pablo Elementary School", principal: "David Lanuza" },
  { name: "Donald Rheem Elementary School", principal: "Brian Sullivan" },
  { name: "Los Perales Elementary School", principal: "Alice Tumilty" },
  { name: "Joaquin Moraga Intermediate School", principal: "Brent Rubey" },
  { name: "Campolindo High School", principal: "Pete Alvarez" },
] as const;

export const BOARD_MEMBERS = [
  { name: "Marco Escobar", role: "President" },
  { name: "Drew Elliott", role: "Vice President" },
  { name: "Dan Muldoon", role: "Treasurer" },
  { name: "Heath Rigsby", role: "Secretary" },
] as const;

export const ADDITIONAL_DIRECTORS = [
  { name: "Rob Greenlee", role: "Operations and Marketing" },
  { name: "Richard Harris", role: "Operations and Marketing" },
  { name: "Sandeep Kesiraju", role: "IT Operations" },
] as const;

export const RELATED_ORGS = [
  { name: "Moraga Education Foundation", url: "https://www.moragaeducation.org/" },
  { name: "Moraga School District", url: "https://www.moraga.k12.ca.us/" },
  { name: "Acalanes Union High School District", url: "https://www.acalanes.k12.ca.us/" },
] as const;

export const FOOTER_SCHOOL_LINKS = [
  { name: "Camino Pablo Elementary", url: "https://cp.moraga.k12.ca.us/" },
  { name: "Donald Rheem Elementary", url: "https://rheem.moraga.k12.ca.us/" },
  { name: "Los Perales Elementary", url: "https://lp.moraga.k12.ca.us/" },
  { name: "Joaquin Moraga Intermediate", url: "https://jm.moraga.k12.ca.us/" },
  { name: "Campolindo High School", url: "https://www.acalanes.k12.ca.us/campolindo" },
] as const;

export const UPCOMING_EVENT = {
  name: "18th Annual Fore Our Schools Golf Tournament",
  date: "Monday, September 14, 2026",
  location: "Moraga Country Club, Moraga, California",
  checkIn: "9:30 AM",
  shotgunStart: "11:00 AM",
  description:
    "Don't miss out on the 18th Annual Moraga Schools Golf Tournament benefiting the schools of Camino Pablo, Los Perales, Rheem Elementary, Joaquin Moraga Intermediate, and Campolindo High School. In the past years, we've raised over $500,000 for the Moraga Education Foundation. This event has become a community-wide tradition so clear your calendar and plan to attend.",
  sponsorship: {
    eagle: { name: "Eagle Sponsor", price: "$2,750", includes: "Complimentary foursome and recognition benefits" },
  },
  registrationUrl: "#", // TODO: Replace with actual Constant Contact registration URL
} as const;
