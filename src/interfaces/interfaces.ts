interface Difference {
    status: string;
    value: string;
    line: number;
    file: number;
  }
  
export interface DifferencesData {
    different: boolean | null;
    differences: Difference[] | null;
}