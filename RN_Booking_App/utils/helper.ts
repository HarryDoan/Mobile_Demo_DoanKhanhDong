type JobPropTypes = {
  id: number | string;
  title: string;
  status: boolean | number;
};

export const JobProps: JobPropTypes[] = [
  {
    id: 1,
    title: "Ongoing",
    status: true,
  },
  {
    id: 2,
    title: "Available",
    status: false,
  },
  {
    id: 3,
    title: "History",
    status: false,
  },
];

export const apiKey = "API_KEY";
