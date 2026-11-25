export const openEnquiryModal = () => {
  window.dispatchEvent(new CustomEvent('astrix:open-enquiry'))
}
