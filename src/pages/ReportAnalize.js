import '../style/report.css';

const ReportAnalize = () => {
  return (
  <>
    <div class="lower-header">
        <h2>Dashboard &gt; Reports</h2>

        <div className="selection">
            <select class="ph-dropdown">
                <option>PH</option>
            </select>&nbsp;&nbsp;&nbsp;

            <select class="days-dropdown">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
            </select>
        </div>
    </div>
  </>);
};

export default ReportAnalize;