

export default (value) => {
  switch (value.toLowerCase()) {
    case 'pending':
    case 'high':
    case 'inactive':
      return 'bg-red-50 text-red-500';
    case 'in-progress':
    case 'low':
      return 'bg-blue-50 text-blue-500' 
    case 'completed':
    case 'medium':
    case 'active':
      return 'bg-green-50 text-green-500'
    case 'deleted':
      return 'bg-red-50 text-red-500'
    default:
      return 'bg-orange-50 text-orange-500';
  }
} 