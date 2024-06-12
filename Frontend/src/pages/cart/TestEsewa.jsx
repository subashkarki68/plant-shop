import React from "react";

const TestEsewa = (formData) => {
  return (
    <div>
      <form
        action='https://rc-epay.esewa.com.np/api/epay/main/v2/form'
        method='POST'
      >
        <input
          type='text'
          hidden
          id='amount'
          name='amount'
          value='100'
          required
        />
        <input
          type='text'
          hidden
          id='tax_amount'
          name='tax_amount'
          value='10'
          required
        />
        <input
          type='text'
          hidden
          id='total_amount'
          name='total_amount'
          value='110'
          required
        />
        <input
          type='text'
          hidden
          id='transaction_uuid'
          name='transaction_uuid'
          required
        />
        <input
          type='text'
          hidden
          id='product_code'
          name='product_code'
          value='EPAYTEST'
          required
        />
        <input
          type='text'
          hidden
          id='product_service_charge'
          name='product_service_charge'
          value='0'
          required
        />
        <input
          type='text'
          hidden
          id='product_delivery_charge'
          name='product_delivery_charge'
          value='0'
          required
        />
        <input
          type='text'
          hidden
          id='success_url'
          name='success_url'
          value='https://esewa.com.np'
          required
        />
        <input
          type='text'
          hidden
          id='failure_url'
          name='failure_url'
          value='https://google.com'
          required
        />
        <input
          type='text'
          hidden
          id='signed_field_names'
          name='signed_field_names'
          value='total_amount,transaction_uuid,product_code'
          required
        />
        <input type='text' hidden id='signature' name='signature' required />
        <input value='Submit' type='submit' />
      </form>
    </div>
  );
};

export default TestEsewa;
