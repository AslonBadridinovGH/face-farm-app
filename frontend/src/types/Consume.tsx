
export type ConsumeType = {
    id : string,
    labels: string[],
    datasets: {
          label: string;
          data: number [];
          backgroundColor: string [];
          borderColor: string;
          borderWidth: number;
    }[];
}