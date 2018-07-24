<?php

/* setting/bootstrap_tabs.twig */
class __TwigTemplate_08e7a5bd54ab9b43437fff4031a8e8c3224eb244e422102529eb80b45d19a1dc extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("bootstrap_tabs.twig");

        $this->blocks = array(
            'extra_html' => array($this, 'block_extra_html'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "bootstrap_tabs.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 2
    public function block_extra_html($context, array $blocks = array())
    {
        // line 3
        echo "  ";
        $context["__internal_eb4b2def52de29d77343f8bc05e8f665c00d152af57d32406f2473be75cb6e61"] = $this->env->loadTemplate("form-elements/input.twig");
        // line 4
        echo "  <div class=\"ai1ec-text-right\">
    ";
        // line 5
        echo $context["__internal_eb4b2def52de29d77343f8bc05e8f665c00d152af57d32406f2473be75cb6e61"]->getbutton($this->getAttribute((isset($context["submit"]) ? $context["submit"] : null), "id"), $this->getAttribute((isset($context["submit"]) ? $context["submit"] : null), "id"), $this->getAttribute((isset($context["submit"]) ? $context["submit"] : null), "value"), "submit", $this->getAttribute((isset($context["submit"]) ? $context["submit"] : null), "args"));
        echo "
  </div>
";
    }

    public function getTemplateName()
    {
        return "setting/bootstrap_tabs.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  284 => 153,  271 => 143,  264 => 139,  256 => 134,  246 => 126,  237 => 123,  232 => 122,  228 => 121,  221 => 117,  214 => 113,  204 => 106,  197 => 102,  186 => 94,  179 => 90,  169 => 83,  162 => 79,  152 => 72,  145 => 68,  135 => 61,  128 => 57,  112 => 47,  98 => 36,  90 => 31,  70 => 25,  61 => 19,  54 => 15,  25 => 4,  80 => 14,  74 => 13,  55 => 8,  21 => 2,  68 => 21,  66 => 11,  62 => 18,  32 => 6,  137 => 38,  133 => 37,  127 => 34,  123 => 33,  114 => 30,  110 => 29,  102 => 28,  96 => 27,  87 => 24,  79 => 23,  63 => 10,  57 => 15,  37 => 5,  44 => 5,  42 => 9,  27 => 4,  95 => 35,  91 => 25,  88 => 32,  81 => 29,  77 => 26,  73 => 26,  58 => 17,  39 => 9,  29 => 5,  59 => 9,  53 => 17,  50 => 13,  47 => 11,  36 => 8,  23 => 3,  129 => 53,  119 => 51,  115 => 48,  108 => 44,  104 => 43,  97 => 36,  93 => 38,  86 => 30,  82 => 33,  75 => 27,  71 => 23,  67 => 19,  60 => 18,  48 => 13,  33 => 8,  22 => 2,  24 => 2,  51 => 7,  49 => 9,  41 => 9,  35 => 7,  30 => 5,  26 => 2,  19 => 1,  56 => 21,  52 => 13,  46 => 12,  43 => 11,  40 => 14,  38 => 3,  34 => 4,  31 => 3,  28 => 2,);
    }
}
