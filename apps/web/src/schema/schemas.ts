import { z } from 'zod';

const minLengthMessage = (field: string, length: number) =>
  `${field} must be at least ${length} characters.`;
const dateRangeValidation = (
  data: { from?: Date; to?: Date },
  ctx: z.RefinementCtx,
) => {
  if (!data.from || !data.to) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select a date range.',
    });
  }
};

export const searchSchema = z.object({
  searchInput: z.string().min(3).max(10),
});

export const projectSchema = z.object({
  projectName: z
    .string()
    .min(2, { message: minLengthMessage('Project name', 2) }),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .superRefine(dateRangeValidation),
  projectDescription: z
    .string()
    .refine((val) => val === '' || val.length >= 10, {
      message: minLengthMessage('Description', 10),
    })
    .optional(),
  teamId: z.string().min(1),
  projectOwnerId: z.string().min(1),
});

export const taskSchema = z
  .object({
    title: z.string().min(2, { message: minLengthMessage('Task title', 2) }),
    description: z
      .string()
      .refine((val) => val === '' || val.length >= 10, {
        message: minLengthMessage('Description', 10),
      })
      .optional(),
    startDate: z.date().optional(),
    dueDate: z.date({ required_error: 'Due date is required.' }),
    status: z.string().optional(),
    priority: z.string().optional(),
    tags: z.array(z.string()).optional(),
    authorId: z.string().min(1, { message: 'Author ID is required.' }),
    assigneeId: z.string().optional(),
    projectId: z.string().optional(),
  })
  .refine((data) => !data.startDate || data.dueDate > data.startDate, {
    message: 'Due date must be after the start date.',
    path: ['dueDate'],
  });

export const SignUpSchema = z.object({
  name: z.string().min(3, {
    message: '❌ Name must be at least 3 characters.',
  }),
  email: z.string().email({
    message: '❌ Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(6, {
      message: '❌ Password must be a minimum of 6 characters',
    })
    .regex(/[A-Z]/, {
      message: '❌ Password must include at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: '❌ Password must include at least one lowercase letter',
    })
    .regex(/[0-9]/, {
      message: '❌ Password must include at least one number',
    }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: '❌ Please enter a valid email address.',
    })
    .transform((email) => email.toLowerCase()),
  password: z.string().min(6, {
    message: '❌ Password is required.',
  }),
});
