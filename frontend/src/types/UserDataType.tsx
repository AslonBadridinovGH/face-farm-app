
export type UserDataType = {
    id : string,
    labels: number[],
    datasets: {
          label: string;
          data: number [];
          backgroundColor: string [];
          borderColor: string;
          borderWidth: number;
    }[];
}