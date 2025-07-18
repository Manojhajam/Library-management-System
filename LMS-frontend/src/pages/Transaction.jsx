import React from 'react'
import Card from '../components/common/Card'
import Table from '../components/common/Table'

const Transaction = () => {
  return <div className='p-2'>
      <h1 className="text-6xl ml-2">Transactions</h1>
      <Card>
        <Table />
      </Card>
    </div>;
}

export default Transaction
