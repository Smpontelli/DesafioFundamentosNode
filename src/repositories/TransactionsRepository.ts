import Transaction from '../models/Transaction';

interface CreateTransactionsDTO {
	title: string;

	value: number;

	type: 'income' | 'outcome';
}

interface Balance {
	income: number;
	outcome: number;
	total: number;
}

class TransactionsRepository {
	private transactions: Transaction[];

	constructor() {
		this.transactions = [];
	}

	public all(): Transaction[] {
		return this.transactions;
	}

	public getBalance(): Balance {
		const groupBy: number[] = this.transactions.reduce((acc, curr) => {
			const key = curr.type;
			(acc[key] = acc[key] || []).push(curr.value);
			return acc;
		}, Object.create(null));

		console.log(groupBy);

		const arrayIncome: number[] = groupBy.income;
		const arrayOutcome: number[] = groupBy.outcome;

		console.log(arrayIncome);
		console.log(arrayOutcome);

		const income = arrayIncome.reduce((acc, curr) => {
			return acc + curr;
		});

		const outcome = arrayOutcome.reduce((acc, curr) => {
			return acc + curr;
		});
		console.log(income);
		console.log(outcome);

		const total = income - outcome;

		const balance = {
			income,
			outcome,
			total
		};

		return balance;
	}

	public create({ title, value, type }: CreateTransactionsDTO): Transaction {
		const transaction = new Transaction({ title, value, type });

		this.transactions.push(transaction);

		return transaction;
	}
}

export default TransactionsRepository;
