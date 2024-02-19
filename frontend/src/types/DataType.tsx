
export type DataType = {
    labels: number[],
    datasets: {
          label: string;
          data: number[];
          backgroundColor: string[];
          borderColor: string;
          borderWidth: number;
    }[];
}