import { Component} from "react";
import {connect} from "react-redux";
import { getDashboard,getRecentTransactions } from "../reducers/dashboardSlice";

const formatDate = (date:string)=>{

 return new Date(date).toLocaleDateString(
  "en-IN",
  {
    day:"2-digit",
    month:"short",
    year:"numeric"
  }
 );

}
interface Props {
  summary: any;
  recentTransactions: any[];
  loading: boolean;
  error: string | null;

  getDashboard: () => void;
  getRecentTransactions: () => void;
}


class Dashboard extends Component<Props> {


  componentDidMount() {

  if (!this.props.summary) {
    this.props.getDashboard();
  }


  if (this.props.recentTransactions.length === 0) {
    this.props.getRecentTransactions();
  }

}


  render() {

    const {
      summary,
      loading,
      error
    } = this.props;


    if (loading) {
      return (
        <h2 className="p-5">
          Loading dashboard...
        </h2>
      );
    }


    if (error) {
      return (
        <h2 className="p-5 text-red-500">
          {error}
        </h2>
      );
    }


    return (

      <div className="p-5">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">


          <div className="bg-white shadow rounded-lg p-5">
            <h3 className="text-gray-500">
              Total Customers
            </h3>

            <p className="text-2xl font-bold">
              {summary?.totalCustomers || 0}
            </p>
          </div>



          <div className="bg-white shadow rounded-lg p-5">

            <h3 className="text-gray-500">
              Money To Take
            </h3>

            <p className="text-2xl font-bold text-green-600">
              ₹ {summary?.totalMoneyToTake || 0}
            </p>

          </div>



          <div className="bg-white shadow rounded-lg p-5">

            <h3 className="text-gray-500">
              Money To Give
            </h3>

            <p className="text-2xl font-bold text-red-600">
              ₹ {summary?.totalMoneyToGive || 0}
            </p>

          </div>



          <div className="bg-white shadow rounded-lg p-5">

            <h3 className="text-gray-500">
              Balance
            </h3>

            <p className="text-2xl font-bold">
              ₹ {summary?.netBalance || 0}
            </p>

          </div>


        </div>
        <div className="mt-8">

<h2 className="text-2xl font-bold mb-4">
  Recent Transactions
</h2>


{
 this.props.recentTransactions.length === 0 ?

 <p>No transactions found</p>


 :

 this.props.recentTransactions.map((tx:any)=>(

  <div
   key={tx.txId}
   className="bg-white shadow rounded-lg p-4 mb-3"
  >

   <div className="flex justify-between">

    <h3 className="font-semibold">
      {tx.customerName}
    </h3>

   <span
 className={
   tx.type === "take"
   ? "text-green-600 font-bold"
   : tx.type === "give"
   ? "text-red-600 font-bold"
   : "text-blue-600 font-bold"
 }
>
 ₹ {tx.amount}
</span>

   </div>


   <p className="capitalize text-gray-600">
 {tx.type !== "take"? "Received": "Given"}
</p>


   <p className="text-gray-500">
    {formatDate(tx.date)}
   </p>
   {
 tx.note &&
 <p className="text-sm text-gray-500 mt-2">
   Note: {tx.note}
 </p>
}

  </div>

 ))

}


</div>

      </div>

    );
  }
}



const mapStateToProps = (state:any) => ({

  summary: state.dashboard.summary,

  recentTransactions:
  state.dashboard.recentTransactions,

  loading: state.dashboard.loading,

  error: state.dashboard.error

});



const mapDispatchToProps = {

  getDashboard,

  getRecentTransactions

};



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);