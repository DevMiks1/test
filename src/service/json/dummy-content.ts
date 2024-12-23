// faq list
export const faqList = [
  {
    question: "Are PA and CPC a requirement to join OWTO?",
    answer:
      "Yes. As mandated by the LTFRB, for a partner to be able to join any TNC, they should have a valid PA or CPC, so that they would not be considered colorum vehicles.",
  },
  {
    question: "What if my PA and CPC are already expired?",
    answer: "Please proceed to LTFRB to renew it.",
  },
  {
    question:
      "What if I don't belong to the current common base of drivers cut by LTFRB can I still register?",
    answer:
      "As of the moment, we at OWTO are only accepting partners with valid CPC and PA, who belongs to the common base of drivers cut by LTFRB.",
  },
  {
    question: "How about hatchbacks?",
    answer: `<p class="pb-10">The LTFRB said that the accreditation of hatchback units would be subject to the following conditions:</p> 
        <ul class="list-disc ml-10">
          <li class="pb-1">Hatchback units shall be accepted subject to a transition period of three years in order for the peers to recoup their investment.</li>
          <li class="pb-1">Hatchback units shall only be allowed to operate within Metro Manila. Hatchback units are prohibited from operating in the provinces of Laguna, Bulacan, Rizal, and Cavite; and</li>
          <li>Hatchback units shall charge lower fares to be approved by the LTFRB.</li>
          
        </ul>`,
  },
  {
    question: "Can I use my PA/CPC to drive with all TNCs in the country?",
    answer: "Since the driver base is now a common pool for all TNCs.",
  },
  {
    question: "How many vehicles can I register for a PA or CPC?",
    answer: "One vehicle, one PA or CPC.",
  },
];
// carousel image
export const images = [
  {
    src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
  },
  {
    src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
  },
  {
    src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
  },
  {
    src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
  },
];

export const tripsHistoryData = [
  {
    id: 1,
    bookingId: "1dd7e4c2-e025-44d3-be4f-2e2bc781107e",
    acceptedAt: "2024-11-14T11:00:13.888Z",
    passengers: [
      {
        employeeId: 1,
        isRepresentative: true,
      },
      {
        employeeId: 2,
      },
      {
        employeeId: null,
        name: "",
      },
    ],
    bookingDate: "2024-09-09T14:25:56.819Z",
    scheduleDate: "2024-11-14T09:54:14.711Z",
    cancelledAt: null,
    tripStartDate: "2024-11-14T11:13:36.557Z",
    tripEndDate: null,
    pickUpAddress: "6969 Acme Building, ",
    dropOffAddress: "karlen pakshet's house",
    pickUpPoint: {
      x: 121.02592,
      y: 14.638247,
    },
    dropOffPoint: {
      x: 121.02592,
      y: 14.638247,
    },
    fare: 813.69,
    variantName: "Owto Premium",
    driverName: "Karlen Pakshet",
    driverImage: null,
    plateNumber: "CAD6551",
    status: "SUCCESS",
  },
  {
    id: 2,
    bookingId: "1dd7e4c2-e025-44d3-be4f-2e2bc781107e",
    acceptedAt: "2024-11-14T11:00:13.888Z",
    passengers: [
      {
        employeeId: 1,
        isRepresentative: true,
      },
      {
        employeeId: 2,
      },
      {
        employeeId: null,
        name: "",
      },
    ],
    bookingDate: "2024-09-09T14:25:56.819Z",
    scheduleDate: "2024-11-14T09:54:14.711Z",
    cancelledAt: null,
    tripStartDate: "2024-11-14T11:13:36.557Z",
    tripEndDate: null,
    pickUpAddress: "6969 Acme Building, ",
    dropOffAddress: "karlen pakshet's house",
    pickUpPoint: {
      x: 121.02592,
      y: 14.638247,
    },
    dropOffPoint: {
      x: 121.02592,
      y: 14.638247,
    },
    fare: 813.69,
    variantName: "Owto Premium",
    driverName: "Karlen Pakshet",
    driverImage: null,
    plateNumber: "CAD6551",
    status: "ONGOING",
  },
];

export const profileDetails = {
  id: 1,
  email: "test@gmail.com",
  mobileNumber: "+639197247687",
  companyName: "Hoodteam",
  companyAddress:
    "1008 One Executive Building, 5 West Ave, Quezon City, 1104 Metro Manila",
  companySize: "51-250",
  name: "Mike Vargas",
  isVerified: true,
  activationStatus: "ACTIVATED",
  createdAt: "2024-11-20T09:32:22.205Z",
  updatedAt: "2024-11-20T17:28:15.012Z",
  tagId: null,
};
